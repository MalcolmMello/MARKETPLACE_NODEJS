import { companiesRepository, productsRepository, requestProductsRepository, requestRepository, statusRepository, userRepository } from "../../repositories";

type RequestData = {
    userId: string,
    request_data: {
        company_id: string,
        user_address_id: string,
        address_number: string,
        isDelivery: boolean,
        products: {
            id: string,
            length: number
        }[],
        card: {
            number: string,
            holder_name: string,
            exp_month: number,
            exp_year: number,
            cvv: string,
            billing_address: {
                line_1: string
            }
        }
    }
};
type RequestProductData = {
    product_id: string,
    product_name: string,
    description: string,
    front_cover: string,
    length: number,
    price: number
}[];

export class CreateRequestService {
    async execute({ userId, request_data }: RequestData) {
        const user = await userRepository().findOneBy({ id: userId });

        if(user == null) {
            return new Error("No user's with that id.");
        };

        const address = user.address.filter(address => address.id === request_data.user_address_id)[0];

        const company = await companiesRepository().findOneBy({ id: request_data.company_id });

        if(company == null) {
            return new Error("No companies with that id.");
        };

        const request_products: RequestProductData = [];

        let total: number = 0;

        for(let product of request_data.products) {
            const existProduct = await productsRepository().findOneBy({ id: product.id });

            if(existProduct == null) {
                return new Error("Product doesn't exists.");
            };

            if(existProduct.company_id !== company.id) {
                return new Error("Product doesn't belongs to that enterprise");
            };

            request_products.push({
                product_id: existProduct.id,
                product_name: existProduct.product_name,
                description: existProduct.product_name,
                front_cover: existProduct.front_cover,
                length: product.length,
                price: existProduct.price,
            });

            total = total + (existProduct.price * product.length);
        };

        const status = await statusRepository().findOneBy({ status_name: "Em aberto" });

        const newRequest = requestRepository()
            .create({ userId, isDelivery: request_data.isDelivery, status_id: status?.id, company_id: request_data.company_id, user_address_id: request_data.user_address_id, address_number: request_data.address_number, total });

        await requestRepository().save(newRequest);

        for(let requestProducts of request_products) {
            const newRequestProduct = requestProductsRepository().create({ productId: requestProducts.product_id, requestId: newRequest.id, price: requestProducts.price, length: requestProducts.length });
            await requestProductsRepository().save(newRequestProduct);
        };

        const result = {
            status: newRequest.status.status_name,
            endereco_entrega: address,
            products: request_products,
            total 
        };

        return result;
    };
};
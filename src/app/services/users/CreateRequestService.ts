import { Products } from "../../entities/Products";
import { companiesRepository, productsRepository, requestRepository, userRepository } from "../../repositories";

type RequestData = {
    userId: string,
    request_data: {
        company_id: string,
        user_address_id: string,
        address_number: string,
        products: {
            id: string,
            length: number
        }[],
        status: "Pendente",
        card: {
            number: number,
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

            if(existProduct instanceof Products) {
                request_products.push({
                    product_id: existProduct.id,
                    length: product.length,
                    price: existProduct.price
                });

                total =+ existProduct.price * product.length;
            };
        };

        const newRequest = requestRepository()
            .create({ user_id: userId, company_id: request_data.company_id, user_address_id: request_data.user_address_id, address_number: request_data.address_number, total, request_products});

        await requestRepository().save(newRequest);

        const result = {
            status: newRequest.status,
            endereco_entrega: address,
            total 
        };

        return result;
    };
};
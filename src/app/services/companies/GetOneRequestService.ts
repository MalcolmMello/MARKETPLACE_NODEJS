import { addressRepository, companiesRepository, requestRepository, userRepository } from "../../repositories";

type OneRequestService = {
    companyId: string,
    requestId: string
};

export class GetOneRequestService {
    async execute({ companyId, requestId }: OneRequestService) {
        if(!companyId) {
            return new Error("Invalid company's id.");
        };

        if(!requestId) {
            return new Error("Invalid request's id.");
        };

        const request = await requestRepository().findOneBy({ id: requestId, company_id: companyId });

        if(request == null) {
            return new Error("Request doesn't exists.");
        };

        const user = await userRepository().findOneBy({ id: request.userId });

        if(user == null) {
            return new Error("User doesn't exists.");
        };

        const address = await addressRepository().findOneBy({ id: request.user_address_id });

        if(address == null) {
            return new Error("Address doesn't exists.");
        };

        const products = [];

        for(let request_products of request.request_products) {
            products.push({
                id: request_products.id,
                product_name: request_products.product.product_name,
                description: request_products.product.description,
                front_cover: request_products.product.front_cover,
                price: request_products.price,
                length: request_products.length
            });
        };

        const result = {
            request_id: request.id,
            username: user.username,
            total: request.total,
            address: {...address, number: request.address_number },
            status: request.status,
            products
        };

        return result;
    };
};
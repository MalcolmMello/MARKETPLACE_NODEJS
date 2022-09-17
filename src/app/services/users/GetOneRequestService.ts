import { addressRepository, companiesRepository, requestRepository } from "../../repositories";

type OneRequestService = {
    userId: string,
    requestId: string
};

export class GetOneRequestService {
    async execute({ userId, requestId }: OneRequestService) {
        if(!userId) {
            return new Error("Invalid user's id.");
        };

        if(!requestId) {
            return new Error("Invalid request's id.");
        };

        const request = await requestRepository().findOneBy({ id: requestId, userId });

        if(request == null) {
            return new Error("User has no requests yet.");
        };

        const company = await companiesRepository().findOneBy({ id: request.company_id });

        if(company == null) {
            return new Error("Company doesn't exists.");
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
            company_name: company.company_name,
            total: request.total,
            address: {...address, number: request.address_number },
            status: request.status,
            products
        };

        return result;
    };
};
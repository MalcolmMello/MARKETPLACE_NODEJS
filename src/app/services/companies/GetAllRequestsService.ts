import { addressRepository, companiesRepository, requestRepository, userRepository } from "../../repositories";

type AllRequestsService = {
    companyId: string,
    responsibleId: string
};

export class GetAllRequestsService {
    async execute({ companyId, responsibleId }: AllRequestsService) {
        if(!companyId) {
            return new Error("Invalid user's id.");
        };

        const isResponsibleCompany = await companiesRepository().findOneBy({ id: companyId, responsible_id: responsibleId,  });

        if(isResponsibleCompany == null) {
            return new Error("Company doesn't belong to this responsible.");
        }

        const requests = await requestRepository().findBy({ company_id: companyId });

        if(requests == null) {
            return new Error("Your company has no requests yet.");
        };

        const result = [];

        for(let request of requests) {
            const user = await userRepository().findOneBy({ id: request.userId});

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

            result.push({
                request_id: request.id,
                username: user.username,
                total: request.total,
                address: {...address, number: request.address_number },
                status: request.status,
                created_at: request.created_at,
                isDelivery: request.isDelivery,
                products
            });
        };

        return result;
    };
};
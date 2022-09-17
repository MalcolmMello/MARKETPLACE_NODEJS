import { requestRepository } from "../../repositories";

type OneRequestService = {
    companyId: string,
    requestId: string
};

export class DeliveredOneRequestService {
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

        request.status = "Entregue";

        await requestRepository().save(request);

        return {
            requestId: request.id,
            username: request.user.username,
            address: request.address,
            products: request.request_products,
            status: request.status
        };
    };
};
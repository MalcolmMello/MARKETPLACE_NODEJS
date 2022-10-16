import { requestRepository, statusRepository } from "../../repositories";

type OneRequestService = {
    companyId: string,
    requestId: string
};

export class DeliveringOneRequestService {
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

        const status = await statusRepository().findOneBy({ status_name: "Saiu para entrega" });

        if(status == null) {
            return new Error("Status doesn't exists.");
        };

        request.status_id = status.id;

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
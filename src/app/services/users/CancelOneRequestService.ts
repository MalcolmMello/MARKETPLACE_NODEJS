import { requestRepository, statusRepository } from "../../repositories";

type OneRequestService = {
    userId: string,
    requestId: string
};

export class CancelOneRequestService {
    async execute({ userId, requestId }: OneRequestService) {
        if(!userId) {
            return new Error("Invalid user's id.");
        };

        if(!requestId) {
            return new Error("Invalid request's id.");
        };

        const request = await requestRepository().findOneBy({ id: requestId, userId });

        if(request == null) {
            return new Error("Request doesn't exists.");
        };

        const status = await statusRepository().findOneBy({ status_name: "Cancelado" });

        if(status == null) {
            return new Error("Status doesn't exists.");
        };
        
        request.status_id = status.id;

        await requestRepository().save(request);

        return {
            requestId: request.id,
            products: request.request_products,
            status: request.status
        };

    };
};
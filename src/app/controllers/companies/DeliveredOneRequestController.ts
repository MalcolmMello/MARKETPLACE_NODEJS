import { Request, Response } from "express";
import { DeliveredOneRequestService } from "../../services/companies/DeliveredOneRequestService";

export class DeliveredOneRequestController {
    async handle(request: Request, response: Response) {
        const { requestId } = request.params; 
        const companyId = request.userId;
        const deliveredOneRequestService = new DeliveredOneRequestService();

        const result = await deliveredOneRequestService.execute({ companyId, requestId });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
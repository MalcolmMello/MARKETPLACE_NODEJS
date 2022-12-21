import { Request, Response } from "express";
import { GetOneRequestService } from "../../services/companies/GetOneRequestService";

export class GetOneRequestController {
    async handle(request: Request, response: Response) {
        const { requestId, companyId } = request.params; 
        const responsibleId = request.userId;
        const getOneRequestService = new GetOneRequestService();

        const result = await getOneRequestService.execute({ companyId, requestId, responsibleId });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
import { Request, Response } from "express";
import { GetOneRequestService } from "../../services/companies/GetOneRequestService";

export class GetOneRequestController {
    async handle(request: Request, response: Response) {
        const { requestId } = request.params; 
        const companyId = request.userId;
        const getOneRequestService = new GetOneRequestService();

        const result = await getOneRequestService.execute({ companyId, requestId });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
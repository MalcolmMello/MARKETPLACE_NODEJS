import { Request, Response } from "express";
import { GetAllRequestsService } from "../../services/companies/GetAllRequestsService";

export class GetAllRequestsController {
    async handle(request: Request, response: Response) {
        const companyId = request.userId;
        const getAllRequestsService = new GetAllRequestsService();

        const result = await getAllRequestsService.execute({ companyId });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
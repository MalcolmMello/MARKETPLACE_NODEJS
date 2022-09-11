import { Request, Response } from "express";
import { GetAllCompaniesService } from "../../services/admin/GetAllCompaniesService";

export class GetAllCompaniesController {
    async handle(request: Request, response: Response) {
        const getAllCompaniesService = new GetAllCompaniesService();

        const result = await getAllCompaniesService.execute();

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
import { Request, Response } from "express";
import { GetAllProductsService } from "../../services/companies/GetAllProductsService";

export class GetAllProductsController {
    async handle(request: Request, response: Response) {
        const companyId = request.userId;

        const getAllProductsService = new GetAllProductsService();

        const result = await getAllProductsService.execute(companyId);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);

    }
}
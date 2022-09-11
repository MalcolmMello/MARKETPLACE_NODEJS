import { Request, Response } from "express";
import { GetCategoryProductService } from "../../services/companies/GetCategoryProductService";

export class GetCategoryProductController {
    async handle(request: Request, response: Response) {
        const companyId = request.userId;
        const getCategoryProductService = new GetCategoryProductService();

        const result = await getCategoryProductService.execute({companyId});

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
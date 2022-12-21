import { Request, Response } from "express";
import { CreateCategoryProductService } from "../../services/companies/CreateCategoryProductService";

export class CreateCategoryProductController {
    async handle(request: Request, response: Response) {
        const { category, companyId } = request.body;
        const responsibleId = request.userId;

        const createCategoryProductService = new CreateCategoryProductService();

        const result = await createCategoryProductService.execute({ responsibleId, category, companyId });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
import { Request, Response } from "express";
import { UpdateCategoryProductService } from "../../services/companies/UpdateCategoryProductService";

export class UpdateCategoryProductController {
    async handle(request: Request, response: Response) {
        const { new_category_name, companyId } = request.body;
        const { categoryId } = request.params;
        const responsibleId = request.userId;

        const updateCategoryProductService = new UpdateCategoryProductService();

        const result = await updateCategoryProductService.execute({ responsibleId, categoryId, companyId, newCategoryName: new_category_name });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
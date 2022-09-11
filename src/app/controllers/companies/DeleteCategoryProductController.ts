import { Request, Response } from 'express';
import { DeleteCategoryProductService } from '../../services/companies/DeleteCategoryProductService';

export class DeleteCategoryProductController {
    async handle(request: Request, response: Response) {
        const { categoryId } = request.params;
        const companyId = request.userId;

        const deleteCategoryProductService = new DeleteCategoryProductService();
        
        const result = await deleteCategoryProductService.execute({ categoryId, companyId });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
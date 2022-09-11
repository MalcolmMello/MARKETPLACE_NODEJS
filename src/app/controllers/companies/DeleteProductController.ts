import { Request, Response } from 'express';
import { DeleteProductService } from '../../services/companies/DeleteProductService';

export class DeleteProductController {
    async handle(request: Request, response: Response) {
        const { productId } = request.params;
        const companyId = request.userId;

        const deleteProductService = new DeleteProductService();
        
        const result = await deleteProductService.execute({ productId, companyId });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
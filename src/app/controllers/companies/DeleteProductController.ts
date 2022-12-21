import { Request, Response } from 'express';
import { DeleteProductService } from '../../services/companies/DeleteProductService';

export class DeleteProductController {
    async handle(request: Request, response: Response) {
        const { productId, companyId } = request.params;
        const responsibleId = request.userId;

        const deleteProductService = new DeleteProductService();
        
        const result = await deleteProductService.execute({ responsibleId, productId, companyId });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
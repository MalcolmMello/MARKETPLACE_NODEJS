import { Request, Response } from "express";
import { UpdateProductService } from "../../services/companies/UpdateProductService";

export class UpdateProductController {
    async handle(request: Request, response: Response) {
        const { categoryProductId, product_name, description, price, companyId } = request.body;
        const { productId } = request.params;
        
        const responsibleId = request.userId;

        const front_cover = request.file;

        const priceToFloat = Number(price);

        const updateProductService = new UpdateProductService();

        const result = await updateProductService.execute({ responsibleId, companyId, productId, categoryProductId, product_name, description, front_cover, price: priceToFloat });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
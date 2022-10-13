import { Request, Response } from "express";
import { CreateProductService } from "../../services/companies/CreateProductService";

export class CreateProductController {
    async handle(request: Request, response: Response) {
        const { categoryProductId, product_name, description, price} = request.body;
        const companyId = request.userId;
        const priceToNumber = Number(price);
        const front_cover = request.file;

        const createProductService = new CreateProductService();
    
        const result = await createProductService.execute({ companyId, categoryProductId, product_name, description, front_cover, price: priceToNumber });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
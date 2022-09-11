import { Request, Response } from "express";
import { GetOneProductService } from "../../services/companies/GetOneProductService";

export class GetOneProductController {
    async handle(request: Request, response: Response) {
        const { productId } = request.params;
        const companyId = request.userId;

        const getOneProductService = new GetOneProductService();

        const result = await getOneProductService.execute({ companyId, productId});

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
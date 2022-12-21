import { Request, Response } from "express";
import { GetOneProductService } from "../../services/companies/GetOneProductService";

export class GetOneProductController {
    async handle(request: Request, response: Response) {
        const { productId, companyId } = request.params;
        const responsibleId = request.userId;

        const getOneProductService = new GetOneProductService();

        const result = await getOneProductService.execute({ companyId, productId, responsibleId});

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
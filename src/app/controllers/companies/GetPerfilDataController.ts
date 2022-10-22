import { Request, Response } from "express";
import { GetPerfilDataService } from "../../services/companies/GetPerfilDataService";

export class GetPerfilDataController {
    async handle(request: Request, response: Response) {
        const companyId = request.userId;

        const getPerfilDataService = new GetPerfilDataService();

        const result = await getPerfilDataService.execute(companyId);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
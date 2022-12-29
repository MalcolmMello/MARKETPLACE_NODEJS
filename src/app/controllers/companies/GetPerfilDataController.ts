import { Request, Response } from "express";
import { GetPerfilDataService } from "../../services/companies/GetPerfilDataService";

export class GetPerfilDataController {
    async handle(request: Request, response: Response) {
        const { userId } = request;
        const { companyId } = request.params;

        const getPerfilDataService = new GetPerfilDataService();

        const result = await getPerfilDataService.execute({ userId, companyId });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
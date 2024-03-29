import { Request, Response } from "express";
import { UpdateCompanyDataService } from "../../services/companies/UpdateCompanyDataService";

export class UpdateCompanyDataController {
    async handle(request: Request, response: Response) {
        const { new_name, description, phone_number, companyId } = request.body;
        const responsibleId = request.userId;

        const files = request.files as { 
            logo: Express.Multer.File[],
            cover: Express.Multer.File[]
        };

        const updateCompanyDataService = new UpdateCompanyDataService();

        const result = await updateCompanyDataService.execute({ responsibleId, new_name, description, files, companyId, phone_number });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
import { Request, Response } from "express";
import { validationResult } from 'express-validator';
import { CreateCompanyService } from "../../services/companies/CreateCompanyService";
import CpnjValidator from "../../validators/CnpjValidator";


export class CreateCompanyController {
    async handle(request: Request, response: Response) {
        const { company_name, password, email, phone_number, cnpj, street, district, zip_code, city, state, country, address_number, longitude, latitude } = request.body;

        const errors = validationResult(request);

        if(!errors.isEmpty()) {
            return response.json({ error: errors.mapped() });
        };

        const isCnpjValid = CpnjValidator(cnpj);

        if(!isCnpjValid) {
            return response.status(400).json({ message: "Cnpj Invalid" });
        };
        
        const createCompanyService = new CreateCompanyService();

        const result = await createCompanyService.execute({ company_name, password, email, phone_number, cnpj, street, district, zip_code, city, state, country, address_number, longitude, latitude }); 

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    }
}
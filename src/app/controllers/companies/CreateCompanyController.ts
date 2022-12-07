import { Request, Response } from "express";
import { validationResult } from 'express-validator';
import { CreateCompanyService } from "../../services/companies/CreateCompanyService";
import { HandleCreateStripeExpress } from "../../stripe/HandleCreateStripeExpress";
import CpnjValidator from "../../validators/CnpjValidator";
import CpfValidator from "../../validators/CpfValidator";


export class CreateCompanyController {
    async handle(request: Request, response: Response) {
        const { responsible_name, cpf, rg, responsible_email, responsible_password, responsible_phone_number, company_name, company_email, company_phone_number, description, cnpj, display_name, address_number, longitude, latitude } = request.body;

        const errors = validationResult(request);

        if(!errors.isEmpty()) {
            return response.json({ error: errors.mapped() });
        };

        const isCnpjValid = CpnjValidator(cnpj);

        if(!isCnpjValid) {
            return response.status(400).json({ message: "Cnpj Invalid" });
        };

        const isCpfValid = CpfValidator(cpf);

        if(!isCpfValid) {
            return response.status(400).json({ message: "Cpf Invalid" });
        };
        
        const createCompanyService = new CreateCompanyService();

        const result = await createCompanyService.execute({ responsible_name, cpf, rg, responsible_email, responsible_password, responsible_phone_number, company_name, company_email, company_phone_number, description, cnpj, display_name, address_number, longitude, latitude }); 

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        const createStripeExpressController = new HandleCreateStripeExpress();

        const newStripeAccount = await createStripeExpressController.handle({ responsible_id: result.responsible_id, company_id: result.company_id, company_name: result.company_name, company_email: result.company_email, company_phone_number: result.phone_number, description: result.description, display_name: result.display_name, address_number: result.address_number, cnpj: result.cnpj });

        if(newStripeAccount instanceof Error) {
            return response.status(400).json(newStripeAccount.message);
        };

        return response.json(result.token).redirect(newStripeAccount);
    }
}
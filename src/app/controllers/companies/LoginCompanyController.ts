import { Request, Response } from 'express';
import { LoginCompanyService } from '../../services/companies/LoginCompanysService';
import { validationResult } from 'express-validator';



export class LoginCompanyController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body;
        
        const errors = validationResult(request);

        if(!errors.isEmpty()) {
            return response.json({ error: errors.mapped() });
        };
        
        const loginUserService = new LoginCompanyService();
        const result = await loginUserService.execute({ email, password });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
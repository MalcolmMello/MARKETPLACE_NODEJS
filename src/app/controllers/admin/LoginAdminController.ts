import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { LoginAdminService } from '../../services/admin/LoginAdminService';


export class LoginAdminController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body;
        
        const errors = validationResult(request);

        if(!errors.isEmpty()) {
            return response.json({ error: errors.mapped() });
        };
        
        const loginAdminService = new LoginAdminService();
        
        const result = await loginAdminService.execute({ email, password });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
import { Request, Response } from 'express';
import { CreateAdminService } from '../../services/admin/CreateAdminService';
import { validationResult } from 'express-validator';


export class CreateAdminController {
    async handle(request: Request, response: Response) {
        const { username, password, email, phone_number } = request.body;
        const errors = validationResult(request);

        if(!errors.isEmpty()) {
            return response.json({ error: errors.mapped() });
        };
        
        const createAdminService = new CreateAdminService();
        const result = await createAdminService.execute({ username, password, email, phone_number });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
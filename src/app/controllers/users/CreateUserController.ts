import { Request, Response } from 'express';
import { CreateUserService } from '../../services/users/CreateUserService';
import { validationResult } from 'express-validator';

export class CreateUserController {
    async handle(request: Request, response: Response) {
        const { username, password, email, phone_number } = request.body;
        const errors = validationResult(request);

        if(!errors.isEmpty()) {
            return response.json({ error: errors.mapped() });
        };
        
        const createUserService = new CreateUserService();
        const result = await createUserService.execute({ username, password, email, phone_number });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
import { Request, Response } from 'express';
import { LoginUserService } from '../../services/users/LoginUserService';
import { validationResult } from 'express-validator';


export class LoginUserController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body;
        
        const errors = validationResult(request);

        if(!errors.isEmpty()) {
            return response.json({ error: errors.mapped() });
        };
        
        const loginUserService = new LoginUserService();
        const result = await loginUserService.execute({ email, password });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
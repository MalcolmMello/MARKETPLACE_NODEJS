import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ForgotPasswordService } from '../../services/users/ForgotPasswordService';

export class ForgotPasswordController {
    async handle(request: Request, response: Response) {
        const { email } = request.body;

        const errors = validationResult(request);

        if(!errors.isEmpty()) {
            return response.json({ error: errors.mapped() });
        };

        const resetPasswordService = new ForgotPasswordService();
    
        const result = await resetPasswordService.execute(email);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
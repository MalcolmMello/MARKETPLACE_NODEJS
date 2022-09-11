import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ResetPasswordService } from '../../services/users/ResetPasswordService';

export class ResetPasswordController {
    async handle(request: Request, response: Response) {
        const { password } = request.body;
        const { token } = request.params;

        const errors = validationResult(request);

        if(!errors.isEmpty()) {
            return response.json({ error: errors.mapped() });
        };

        const resetPasswordService = new ResetPasswordService();
    
        const result = await resetPasswordService.execute({ password, token});

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
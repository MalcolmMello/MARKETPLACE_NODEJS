import { Request, Response } from "express";
import { HandleCreateStripeExpress } from "../../stripe/HandleCreateStripeExpress";

export class StripeRefreshController {
    async handle(request: Request, response: Response) {
        const { company_id } = request.body;
        const responsibleId = request.userId;

        const handleCreateStripeExpress = new HandleCreateStripeExpress();
    
        const result = await handleCreateStripeExpress.handle({ company_id: company_id, responsible_id: responsibleId });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.redirect(result);
    };
};
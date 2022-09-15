import { Request, Response } from 'express';
import { CreateRequestService } from '../../services/users/CreateRequestService';

export class CreateRequestController {
    async handle(request: Request, response: Response) {
        const { request_data } = request.body;
        const userId = request.userId;

        const createRequestService = new CreateRequestService();

        const result = await createRequestService.execute({ userId, request_data });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
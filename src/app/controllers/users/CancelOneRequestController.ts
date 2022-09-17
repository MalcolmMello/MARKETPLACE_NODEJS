import { Request, Response } from "express";
import { CancelOneRequestService } from "../../services/users/CancelOneRequestService";

export class CancelOneRequestController {
    async handle(request: Request, response: Response) {
        const { requestId } = request.params; 
        const userId = request.userId;
        const cancelOneRequestService = new CancelOneRequestService();

        const result = await cancelOneRequestService.execute({ userId, requestId });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
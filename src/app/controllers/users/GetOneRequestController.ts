import { Request, Response } from "express";
import { GetOneRequestService } from "../../services/users/GetOneRequestService";


export class GetOneRequestController {
    async handle(request: Request, response: Response) {
        const { requestId } = request.params; 
        const userId = request.userId;
        const getOneRequestService = new GetOneRequestService();

        const result = await getOneRequestService.execute({ userId, requestId });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
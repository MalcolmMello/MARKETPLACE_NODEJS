import { Request, Response } from 'express';
import { GetResponsibleDataService } from '../../services/companies/GetResponsibleDataService';

export class GetResponsibleDataController {
    async handle(request: Request, response: Response) {
        const { userId } = request;
        
        const getResponsibleDataService = new GetResponsibleDataService();
        const result = await getResponsibleDataService.execute({ userId });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
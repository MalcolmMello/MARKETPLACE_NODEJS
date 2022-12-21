import { Request, Response } from "express";
import { ChangeRequestStatusService } from "../../services/companies/ChangeRequestStatusService";

export class ChangeRequestStatusController {
    async handle(request: Request, response: Response) {
        const { requestId } = request.params;
        const { status_name, companyId } = request.body; 
        const responsibleId = request.userId;
        const deliveredOneRequestService = new ChangeRequestStatusService();

        const result = await deliveredOneRequestService.execute({ responsibleId, companyId, requestId, status_name });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
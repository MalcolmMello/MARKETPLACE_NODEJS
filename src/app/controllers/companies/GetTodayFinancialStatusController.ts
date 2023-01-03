import { Request, Response } from "express";
import { GetTodayFinancialStatusService } from "../../services/companies/GetTodayFinancialStatusServiceFinancialStatusService";

export class GetTodayFinancialStatusController {
    async handle(request: Request, response: Response) {
        const { userId } = request;
        const { companyId } = request.params;

        const getTodayFinancialStatusService = new GetTodayFinancialStatusService();

        const result = await getTodayFinancialStatusService.execute({ companyId, responsibleId: userId });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    }
}
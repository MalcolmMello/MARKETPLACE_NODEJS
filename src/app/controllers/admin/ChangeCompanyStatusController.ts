import { Request, Response } from "express";
import { ChangeCompanyStatusService } from "../../services/admin/ChangeCompanyStatusService";

export class ChangeCompanyStatusController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { status } = request.body;
        const isAdmin = request.isAdmin;;

        const changeCompanyStatusService = new ChangeCompanyStatusService();

        const result = await changeCompanyStatusService.execute({ id, status, isAdmin });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
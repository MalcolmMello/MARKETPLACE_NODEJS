import { Request, Response } from "express";
import { UpdateOperatingRadiusService } from "../../services/companies/UpdateOperatingRadiusService";


export class UpdateOperatingRadiusController {
    async handle(request: Request, response: Response) {
        const { radius, companyId } = request.body;

        console.log(radius, companyId)
        
        const responsibleId = request.userId;

        const updateOperatingRadiusService = new UpdateOperatingRadiusService();

        const result = await updateOperatingRadiusService.execute({ radius, responsibleId, companyId });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
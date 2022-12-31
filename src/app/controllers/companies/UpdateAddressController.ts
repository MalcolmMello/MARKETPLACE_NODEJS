import { Request, Response } from "express";
import { UpdateAddressService } from "../../services/companies/UpdateAddressService";

export class UpdateAddressController {
    async handle(request: Request, response: Response) {
        const {display_name, number, lat, long, companyId } = request.body;
        const responsibleId = request.userId;

        const updateAddressService = new UpdateAddressService();

        const result = await updateAddressService.execute({ responsibleId, companyId, display_name, number, lat, long});

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
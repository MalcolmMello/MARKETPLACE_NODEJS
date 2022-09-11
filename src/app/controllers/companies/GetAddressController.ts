import { Request, Response } from "express";
import { GetAddressService } from "../../services/companies/GetAddressService";

export class GetAddressController {
    async handle(request: Request, response: Response) {
        const companyId = request.userId;
        const getAddressService = new GetAddressService();

        const result = await getAddressService.execute({companyId});

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
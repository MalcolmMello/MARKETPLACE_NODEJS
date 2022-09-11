import { Request, Response } from "express";
import { UpdateAddressService } from "../../services/companies/UpdateAddressService";

export class UpdateAddressController {
    async handle(request: Request, response: Response) {
        const { street, district, zip_code, city, state, country, address_number, longitude, latitude } = request.body;
        const companyId = request.userId;
        const updateAddressService = new UpdateAddressService();

        const result = await updateAddressService.execute({companyId, street, district, zip_code, city, state, country, address_number, longitude, latitude});

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
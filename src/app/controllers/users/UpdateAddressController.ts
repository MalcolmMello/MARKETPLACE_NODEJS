import { Request, Response } from "express";
import { UpdateAddressService } from "../../services/users/UpdateAddressService";

export class UpdateAddressController {
    async handle(request: Request, response: Response) {
        const { number, street, district, zip_code, city, state, country, longitude, latitude } = request.body;
        const { id } = request.params;
        const userId = request.userId;
        const updateAddressService = new UpdateAddressService();
        
        const result = await updateAddressService.execute({ userId, id, number, street, district, zip_code, city, state, country, longitude, latitude });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result)
    };
};
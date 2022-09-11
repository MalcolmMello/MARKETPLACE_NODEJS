import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { CreateAddressService } from '../../services/users/CreateAddressService';

export class CreateAddressController {
    async handle(request: Request, response: Response) {
        const { street, district, zip_code, city, state, country, longitude, latitude } = request.body;
        const userId = request.userId;

        const errors = validationResult(request);

        if(!errors.isEmpty()) {
            return response.json({ error: errors.mapped() });
        };
        
        const createAddressService = new CreateAddressService();
        
        const lon = Number(longitude);
        const lat = Number(latitude);
        
        const result = await createAddressService.execute({ userId, street, district, zip_code, city, state, country, longitude: lon, latitude: lat });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
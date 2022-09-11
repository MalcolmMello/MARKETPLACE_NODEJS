import { Request, Response } from 'express';
import { DeleteAddressService } from '../../services/users/DeleteAddressService';

export class DeleteAddressController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const userId = request.userId;

        const deleteAddressService = new DeleteAddressService;
        
        const result = await deleteAddressService.execute({ id, userId });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
}
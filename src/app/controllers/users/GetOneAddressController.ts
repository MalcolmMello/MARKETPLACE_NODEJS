import { Request, Response } from "express";
import { GetOneAddressService } from "../../services/users/GetOneAddressService";

export class GetOneAddressController {
    async handle(request: Request, response: Response) {
        const { id }  = request.params;
        const userId = request.userId;
        const getOneAddressService = new GetOneAddressService();

        const result = await getOneAddressService.execute({id, userId});

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
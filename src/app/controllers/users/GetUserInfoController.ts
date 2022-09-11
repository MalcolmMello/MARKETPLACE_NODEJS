import { Request, Response } from "express";
import { GetUserInfoService } from "../../services/users/GetUserInfoService";

export class GetUserInfoController {
    async handle(request: Request, response: Response) {
        const id = request.userId;

        const getUserInfoService = new GetUserInfoService();

        const result = await getUserInfoService.execute(id);

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}
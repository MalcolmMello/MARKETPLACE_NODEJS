import { Request, Response } from "express";

export class NotificationsController {
    async handle(request: Request, response: Response) {
        const body = request.body;
        const query = request.query;

        return response.json({ body, query });
    };
};
import { Request, Response } from "express";

export class OAuthController {
    async handle(request: Request, response: Response) {
        const query = request.query;
        
        const code = String(query.code);
        const state = String(query.state);

        return response.json({ code, state });
    };
};
import { Request, Response } from "express";
import { SearchForCompanyOrProductService } from "../../services/users/SearchForCompanyOrProductService";

export class SearchForCompanyOrProductController {
    async handle(request: Request, response: Response) {
        const query = request.query;
        
        const searchQuery = String(query.searchQuery);
        const tag = String(query.tag);

        const searchForCompanyOrProductService = new SearchForCompanyOrProductService();

        const result = await searchForCompanyOrProductService.execute({ searchQuery, tag }); 

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);
    };
};
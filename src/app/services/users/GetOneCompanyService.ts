import { companiesRepository, productsRepository } from "../../repositories";

export class GetOneCompanyService {
    async execute(id: string) {
        const hasId = id;
        
        if(!hasId) {
            return new Error("Missing company id");
        };

        const company = await companiesRepository().findOneBy({ id });
        
        if(company == null) {
            return new Error("No companies with that id");
        };

        const resultProducts = [];

        for(let category_product of company.categories_products) {
            const products = await productsRepository().findBy({ categoryProductId: category_product.id });
            
            resultProducts.push({
                category_name: category_product.category_name,
                products
            });
        };

        const result = {
            company: company.company_name,
            resultProducts
        };

        return result; 
    };
};
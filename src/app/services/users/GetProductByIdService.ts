import { companiesRepository, productsRepository } from "../../repositories";

export class GetProductByIdService {
    async execute(id: string) {
        const product = await productsRepository().findOneBy({ id });

        if(product == null) {
            return new Error("No products with that id.");
        };

        const company = await companiesRepository().findOneBy({ id: product.company_id })

        if(company == null) {
            return new Error("No companies to this product.");
        };

        const result = {
            ...product, company: company?.company_name,
        };
        
        return result;
    }
}
import { companiesRepository, productsCategoriesRepository } from "../../repositories";

type GetCategoryProduct = {
    companyId: string
};

export class GetCategoryProductService {
    async execute({companyId}: GetCategoryProduct) {
        const hasId = companyId;
        
        if(!hasId) {
            return new Error("Missing company id");
        };

        const company = await companiesRepository().findOneBy({ id: companyId });

        if(company == null) {
            return new Error("Company doesn't exists");
        };

        const categoryProduct = await productsCategoriesRepository().findBy({ company_id: company.id });

        return categoryProduct;
    };
};
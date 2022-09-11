import { companiesRepository, productsRepository } from "../../repositories";

export class GetAllProductsService {
    async execute(companyId: string) {
        const hasCompanyId = companyId;

        if(!hasCompanyId) {
            return new Error("Company id is missing");
        };

        const existCompany = await companiesRepository().findOneBy({ id: companyId });

        if(existCompany == null) {
            return new Error("Company doesn't exists.");
        };

        const products = await productsRepository().findBy({ company_id: existCompany.id });

        const result = {
            company_name: existCompany.company_name,
            products
        };

        return result
    };
};
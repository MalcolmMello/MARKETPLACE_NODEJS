import { companiesRepository, productsRepository } from "../../repositories";

type GetProducts = {
    responsibleId: string
    companyId: string
};

export class GetAllProductsService {
    async execute({ responsibleId, companyId }: GetProducts) {
        const hasCompanyId = companyId;

        if(!hasCompanyId) {
            return new Error("Company id is missing");
        };

        const existCompany = await companiesRepository().findOneBy({ id: companyId, responsible_id: responsibleId });

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
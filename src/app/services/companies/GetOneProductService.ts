import { companiesRepository, productsRepository } from "../../repositories";

type GetOneProduct = {
    companyId: string,
    productId: string
}
export class GetOneProductService {
    async execute({ companyId, productId }: GetOneProduct) {
        const hasCompanyId = companyId;

        if(!hasCompanyId) {
            return new Error("Company id is missing");
        };

        const existCompany = await companiesRepository().findOneBy({ id: companyId });

        if(existCompany == null) {
            return new Error("Company doesn't exists.");
        };

        const product = await productsRepository().findOneBy({ company_id: existCompany.id, id: productId });

        const result = {
            company_name: existCompany.company_name,
            product
        };

        return result
    };
};
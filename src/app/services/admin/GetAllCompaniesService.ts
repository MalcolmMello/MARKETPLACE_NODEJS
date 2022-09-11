import { companiesRepository } from "../../repositories";

export class GetAllCompaniesService {
    async execute() {
        const companies = await companiesRepository().find();
        
        if(companies == null) {
            return new Error("There are no companies.");
        };

        const result = [];

        for(let company of companies) {
            result.push({
                id: company.id,
                company_name: company.company_name,
                email: company.email,
                phone_number: company.phone_number,
                cnpj: company.cnpj,
                addressId: company.addressId,
                logo: company.logo,
                cover: company.cover,
                isApproved: company.isApproved
            });
        };
        
        return result;
    }
}
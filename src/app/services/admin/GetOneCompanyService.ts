import { companiesRepository } from "../../repositories";

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

        const result = {
            id: company.id,
            company_name: company.company_name,
            email: company.email,
            phone_number: company.phone_number,
            cnpj: company.cnpj,
            addressId: company.addressId,
            logo: company.logo,
            cover: company.cover,
            isApproved: company.isApproved
        };

        return result; 
    };
};
import { companiesRepository } from "../../repositories";

export class GetPerfilDataService {
    async execute(companyId: string) {
        if(!companyId) {
            return new Error("Company's id is missing.");
        };

        const existCompany = await companiesRepository().findOneBy({ id: companyId });

        if(existCompany == null) {
            return new Error("Company doesn't exists");
        };

        const result = {
            company_name: existCompany.company_name,
            description: existCompany.description,
            phone_number: existCompany.phone_number,
            logo: existCompany.logo != null ? `http://localhost:5000/media/${existCompany.logo}.jpg` : existCompany.logo,
            cover: existCompany.cover != null ? `http://localhost:5000/media/${existCompany.cover}.jpg` : existCompany.cover
        };

        return result;
    }
}
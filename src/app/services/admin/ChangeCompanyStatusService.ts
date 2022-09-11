import { companiesRepository } from "../../repositories";

type Props = {
    id: string,
    status: "Em Aprovação" | "Aprovado" | "Rejeitado" | "Suspenso";
    isAdmin: boolean
};

export class ChangeCompanyStatusService {
    async execute({ id, status, isAdmin }: Props) {
        const company = await companiesRepository().findOneBy({ id });
        
        if(company == null) {
            return new Error("There are no companies with that id.");
        };

        if(isAdmin === false) {
            return new Error("You are not allowed.")
        };

        company.isApproved = status ? status : company.isApproved;

        await companiesRepository().save(company);

        const result = {
            company_id: company.id,
            company_name: company.company_name,
            status: company.isApproved
        };

        return result;
    }
}
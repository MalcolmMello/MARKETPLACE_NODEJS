import jwt from 'jsonwebtoken';
import { compare } from "bcryptjs";
import { responsibleRepository } from "../../repositories";

type LoginCompany = {
    email: string,
    password: string
};

type Company = {
    id: string,
    isMainCompany: boolean
};

export class LoginCompanyService {
    async execute({ email, password }: LoginCompany) {
        const hasAllData = password && email;

        if(!hasAllData) {
            return new Error("Missing company's informations");
        };

        const existingResponsible = await responsibleRepository().findOneBy({ email });

        if(existingResponsible == null) {
            return new Error("Invalid Credentials.");
        };

        const isPasswordCorrect = await compare(password, existingResponsible.password);

        if(!isPasswordCorrect) {
            return new Error("Invalid Credentials.");
        };

        let responsible_companies: Company[] = [];

        for(let i = 0; i < existingResponsible.companies.length; i++) {
            responsible_companies.push({
                id: existingResponsible.companies[i].id,
                isMainCompany: existingResponsible.companies[i].isMainCompany
            });
        }
            
        const token = jwt.sign({ email: existingResponsible.email, id: existingResponsible.id }, 'teste', { expiresIn: "1h" });

        const result = { company_name: existingResponsible.responsible_name, email: existingResponsible.email, phone_number: existingResponsible.phone_number, id: existingResponsible.id, token, subscription_status: existingResponsible.subscription_status, responsible_companies };

        return result;
    };
};
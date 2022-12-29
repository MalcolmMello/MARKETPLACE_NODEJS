import jwt from 'jsonwebtoken';
import { compare } from "bcryptjs";
import { responsibleRepository } from "../../repositories";

type LoginCompany = {
    userId: string
};

type Company = {
    id: string,
    isMainCompany: boolean
};

export class GetResponsibleDataService {
    async execute({ userId }: LoginCompany) {
        const hasUserId = userId;

        if(!hasUserId) {
            return new Error("Missing responsible's informations");
        };

        const existingResponsible = await responsibleRepository().findOneBy({ id: userId });

        if(existingResponsible == null) {
            return new Error("Invalid Credentials.");
        };

        let responsible_companies: Company[] = [];

        for(let i = 0; i < existingResponsible.companies.length; i++) {
            responsible_companies.push({
                id: existingResponsible.companies[i].id,
                isMainCompany: existingResponsible.companies[i].isMainCompany
            });
        }

        const result = { responsible_name: existingResponsible.responsible_name, email: existingResponsible.email, phone_number: existingResponsible.phone_number, id: existingResponsible.id, subscription_status: existingResponsible.subscription_status, responsible_companies };

        return result;
    };
};
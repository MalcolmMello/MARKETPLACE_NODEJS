import jwt from 'jsonwebtoken';
import { compare } from "bcryptjs";
import { companiesRepository } from "../../repositories";

type LoginCompany = {
    email: string,
    password: string
};

export class LoginCompanyService {
    async execute({ email, password }: LoginCompany) {
        const hasAllData = password && email;

        if(!hasAllData) {
            return new Error("Missing company's informations");
        };

        const existingCompany = await companiesRepository().findOneBy({ email });

        if(!existingCompany) {
            return new Error("Invalid Credentials.");
        };

        const isPasswordCorrect = await compare(password, existingCompany.password);

        if(!isPasswordCorrect) {
            return new Error("Invalid Credentials.");
        }

        const token = jwt.sign({ email: existingCompany.email, id: existingCompany.id }, 'teste', { expiresIn: "1h" });

        const result = { company_name: existingCompany.company_name, email: existingCompany.email, phone_number: existingCompany.phone_number, id: existingCompany.id, token };

        return result;
    };
};
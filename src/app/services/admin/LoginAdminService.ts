import jwt from 'jsonwebtoken';
import { compare } from "bcryptjs";
import { adminRepository } from "../../repositories";

type LoginAdmin = {
    email: string,
    password: string
};

export class LoginAdminService {
    async execute({ email, password }: LoginAdmin) {
        const hasAllData = password && email;

        if(!hasAllData) {
            return new Error("Missing admin's informations");
        };

        const existingAdmin = await adminRepository().findOneBy({ email });

        if(existingAdmin == null) {
            return new Error("Invalid Credentials.");
        };

        const isPasswordCorrect = await compare(password, existingAdmin.password);

        if(!isPasswordCorrect) {
            return new Error("Invalid Credentials.")
        }

        const token = jwt.sign({ email: existingAdmin.email, id: existingAdmin.id, isAdmin:true }, 'teste', { expiresIn: "1h" });

        const result = { username: existingAdmin.username, email: existingAdmin.email, phone_number: existingAdmin.phone_number, id: existingAdmin.id, token };

        return result;
    };
};
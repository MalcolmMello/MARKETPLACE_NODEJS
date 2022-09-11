import jwt from 'jsonwebtoken';
import { hash } from "bcryptjs";
import { adminRepository } from "../../repositories";

type CreateAdmin = {
    username: string,
    email: string,
    password: string,
    phone_number: string
};

export class CreateAdminService {
    async execute({ username, password, email, phone_number }: CreateAdmin) {
        const hasAllData = username && password && email && phone_number;

        if(!hasAllData) {
            return new Error("Missing admin's informations");
        };
        
        const existAdmin = await adminRepository().findOneBy({ email });

        if(existAdmin) {
            return new Error("Admin already exists");
        };

        const passwordHash = await hash(password, 8);

        const newAdmin = adminRepository().create({ username, password: passwordHash, email, phone_number });

        await adminRepository().save(newAdmin);

        const token = jwt.sign({ email: newAdmin.email, id: newAdmin.id, isAdmin: true }, 'teste', { expiresIn: "1h" });

        const result = { username: newAdmin.username, email: newAdmin.email, phone_number: newAdmin.phone_number, id: newAdmin.id, token };

        return result;
    };
};
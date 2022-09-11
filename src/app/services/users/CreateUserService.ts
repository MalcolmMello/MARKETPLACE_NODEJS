import jwt from 'jsonwebtoken';
import { hash } from "bcryptjs";
import { userRepository } from "../../repositories";

type CreateUser = {
    username: string,
    email: string,
    password: string,
    phone_number: string
};

export class CreateUserService {
    async execute({ username, password, email, phone_number }: CreateUser) {
        const hasAllData = username && password && email && phone_number;

        if(!hasAllData) {
            return new Error("Missing user's informations");
        };
        
        const existUser = await userRepository().findOneBy({ email });

        if(existUser) {
            return new Error("User already exists");
        };

        const passwordHash = await hash(password, 8);

        const newUser = userRepository().create({ username, password: passwordHash, email, phone_number });

        await userRepository().save(newUser);

        const token = jwt.sign({ email: newUser.email, id: newUser.id }, 'teste', { expiresIn: "1h" });

        const result = { username: newUser.username, email: newUser.email, phone_number: newUser.phone_number, id: newUser.id, token };

        return result;
    };
};
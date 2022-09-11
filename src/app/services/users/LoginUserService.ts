import jwt from 'jsonwebtoken';
import { compare } from "bcryptjs";
import { userRepository } from "../../repositories";

type LoginUser = {
    email: string,
    password: string
};

export class LoginUserService {
    async execute({ email, password }: LoginUser) {
        const hasAllData = password && email;

        if(!hasAllData) {
            return new Error("Missing user's informations");
        };

        const existingUser = await userRepository().findOneBy({ email });

        if(!existingUser) {
            return new Error("Invalid Credentials.");
        };

        const isPasswordCorrect = await compare(password, existingUser.password);

        if(!isPasswordCorrect) {
            return new Error("Invalid Credentials.")
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, 'teste', { expiresIn: "1h" });

        const result = { username: existingUser.username, email: existingUser.email, phone_number: existingUser.phone_number, id: existingUser.id, token };

        return result;
    };
};
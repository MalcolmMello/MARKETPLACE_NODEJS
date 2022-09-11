import jwt from 'jsonwebtoken';
import { hash } from 'bcryptjs';
import { userRepository } from '../../repositories';

type ResetPassword = {
    password: string,
    token: string
};

export class ResetPasswordService {
    async execute({password, token}: ResetPassword) {
        const decodedData = jwt.verify(token, 'teste');

        if(typeof decodedData !== 'object' || !decodedData.id) {
            return new Error("Invalid Token.");
        };

        const passwordHash = await hash(password, 8);

        const existingUser = await userRepository().findOneBy({ id: decodedData.id });

        if(!existingUser) {
            return new Error("User doesn't exist");
        }

        existingUser.password = passwordHash;

        await userRepository().save(existingUser);

        const message = "Password reset successfully";
        
        return message; 
    };
};
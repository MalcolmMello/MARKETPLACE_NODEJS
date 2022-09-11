import jwt from 'jsonwebtoken';
import sendEmail from "../../helpers/sendEmail";
import { userRepository } from "../../repositories";

export class ForgotPasswordService {
    async execute(email: string) {
        const hasEmail = email;

        if(!hasEmail) {
            return new Error("Missing user's informations");
        };

        const existingUser = await userRepository().findOneBy({ email });

        if(!existingUser) {
            return new Error("Invalid Credentials.");
        };

        const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, 'teste', { expiresIn: "15m" });
        
        const link = `http://localhost:5000/user/reset_password/${token}`;

        await sendEmail(
            email,
            'malcomellolima@gmail.com',
            'Reset your password',
            `
                <div>Click the link below to reset your password.</div><br/>
                <div>${link}</div>
            `
        )

        const message = 'Password reset link has been successfully sent to your inbox';
        
        return message;

    };
};
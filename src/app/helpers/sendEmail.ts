import dotenv from 'dotenv';
import sgMail, { MailService } from '@sendgrid/mail';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const sendEmail = (receiver: any, source: any, subject: any, content: any) => {
    try {

        const data = {
            to: receiver,
            from: source,
            subject,
            html: content
        };

        return sgMail.send(data);
    } catch (error) {
        return console.log(error);
    }
}

export default sendEmail;
import { companiesRepository } from '../repositories';
import { stripe } from '../helpers/stripe';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export class HandleCreateStripeExpress {
    async handle(request: Request, response: Response) {
        const { company_id, company_name, company_email, company_phone_number, cnpj, display_name } = request.body;
        
        const responsible_id = request.userId;

        const company = await companiesRepository().findOneBy({ id: company_id, responsible_id });

        if(company == null) {
            return new Error("Company doesn't exists.");
        };

        try {
            let accountId = company.stripeAccountId;

            if(accountId == null) {
                const account = await stripe.accounts.create(
                    {
                        type: 'express',
                        email: company_email,
                        business_type: 'company',
                        company: {
                            name: company_name,
                            address: {
                                country: 'BR',
                                line1: String(display_name).length > 200 ? `${String(display_name).substring(0,195)}...` : display_name ,
                                postal_code: String(display_name).slice(-7, -16),
                            },
                            phone: company_phone_number,
                            registration_number: cnpj,
                        }
                    }
                );
        
                accountId = account.id;
                company.stripeAccountId = accountId;
    
                await companiesRepository().save(company);
            }     

            // Create an account link for the user's Stripe account
            
            const accountLink = await stripe.accountLinks.create({
                account: accountId,
                refresh_url: `${process.env.PUBLIC_DOMAIN}`,
                return_url: `${process.env.PUBLIC_DOMAIN}`,
                type: 'account_onboarding'
            });
    
            return response.json({ url: accountLink.url});
        } catch (err) {
            const error = new Error(`Failed to create a Stripe account. More details about the error: ${err}`);

            return response.json(error.message);
        }
    };
}
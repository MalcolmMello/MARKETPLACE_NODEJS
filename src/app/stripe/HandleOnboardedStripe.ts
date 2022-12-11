import { companiesRepository } from '../repositories';
import { stripe } from '../helpers/stripe';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export class HandleOnboardedStripe {
    async handle(request: Request, response: Response) {
        const { company_id } = request.body;
        
        const responsible_id = request.userId;

        const company = await companiesRepository().findOneBy({ id: company_id, responsible_id });

        if(company == null) {
            return new Error("Company doesn't exists.");
        };

        try {
            const account = await stripe.accounts.retrieve(company.stripeAccountId);
            
            if(account.details_submitted) {
                company.onboardingComplete = true;

                await companiesRepository().save(company);

                return response.redirect(process.env.PUBLIC_DOMAIN as string);
            } else {
                return response.json({ error: 'The onboarding process was not completed.' }).redirect(`${process.env.PUBLIC_DOMAIN}/setup-payments`);
            }
            
        } catch (err) {
            const error = new Error(`Failed to retrieve Stripe account information. More details about the error: ${err}`);

            return response.json(error.message);
        }
    };
}
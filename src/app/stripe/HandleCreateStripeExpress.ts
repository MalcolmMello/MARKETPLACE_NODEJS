import { Stripe } from 'stripe';
import { companiesRepository } from '../repositories';

const stripe = new Stripe('sk_test_51Lz7Y3Jvzkzf4DAWuacq3NugEhmDBLqcQjWSRwPHIZsH1yVwLWnJqnmR3fBWlNqtYawiLw4m7bf15uEhbHUj3xZC00REYYqsvR', {apiVersion: "2022-08-01"} );

type CompanyData = {
    responsible_id: string,
    company_id: string,
    company_name?: string,
    company_email?: string,
    company_phone_number?: string,
    description?: string,
    cnpj?: string,
    display_name?: string,
    address_number?: string,
}

export class HandleCreateStripeExpress {
    async handle({ responsible_id, company_id, company_name, company_email, company_phone_number, description, cnpj, display_name, address_number }: CompanyData) {
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
                                line1: display_name,
                                postal_code: String(display_name).slice(-7, -16),
                            },
                            phone: company_phone_number,
                            registration_number: cnpj,
                        },
                        business_profile: {
                            product_description: description
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
                refresh_url: `${process.env.PUBLIC_DOMAIN}/companies/refresh_url`,
                return_url: `${process.env.PUBLIC_DOMAIN}/companies/onboarded`,
                type: 'account_onboarding'
            });
    
            return accountLink.url;
        } catch (error) {
            return new Error(`Failed to create a Stripe account. More details about the error: ${error}`);
        }
    };
}
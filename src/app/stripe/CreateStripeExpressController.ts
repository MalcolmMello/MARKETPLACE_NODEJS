import { Stripe } from 'stripe';
import { companiesRepository } from '../repositories';
const stripe = new Stripe('sk_test_51Lz7Y3Jvzkzf4DAWuacq3NugEhmDBLqcQjWSRwPHIZsH1yVwLWnJqnmR3fBWlNqtYawiLw4m7bf15uEhbHUj3xZC00REYYqsvR', {apiVersion: "2022-08-01"} );

type CompanyData = {
    responsible_id: string,
    company_id: string,
    company_name: string,
    company_email: string,
    company_phone_number: string,
    description: string,
    cnpj: string,
    street: string,
    district: string,
    zip_code: string,
    city: string,
    state: string,
    address_number: string,
}

export class HandleCreateStripeExpress {
    async handle({ responsible_id, company_id, company_name, company_email, company_phone_number, description, cnpj, street, district, zip_code, city, state, address_number }: CompanyData) {
        const company = await companiesRepository().findOneBy({ id: company_id, responsible_id });

        if(company == null) {
            return new Error("Company doesn't exists.");
        };

        if(company.stripeAccountId == null) {
            try {
                const account = await stripe.accounts.create(
                    {
                        type: 'express',
                        email: company_email,
                        business_type: 'company',
                        company: {
                            name: company_name,
                            address: {
                                city: city,
                                country: 'BR',
                                line1: `${street}, ${district}, ${city}, ${address_number}`,
                                postal_code: `${zip_code}`,
                                state: state
                            },
                            phone: company_phone_number,
                            registration_number: cnpj,
                        },
                        business_profile: {
                            product_description: description
                        }
                    }
                );
        
                const accountId = account.id;
    
                // Create an account link for the user's Stripe account
                const accountLink = await stripe.accountLinks.create({
                    account: accountId,
                    refresh_url: '',
                    return_url: '',
                    type: 'account_onboarding'
                });
                
                company.stripeAccountId = accountId;

                return accountLink.url;
            } catch (error) {
                return new Error(`Failed to create a Stripe account. More details about the error: ${error}`);
            }
        } else {
            return new Error("Company already has a Stripe account configured.");
        }       
    };
}
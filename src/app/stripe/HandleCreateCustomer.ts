import { Stripe } from 'stripe';
import { responsibleRepository } from '../repositories';
const stripe = new Stripe('sk_test_51Lz7Y3Jvzkzf4DAWuacq3NugEhmDBLqcQjWSRwPHIZsH1yVwLWnJqnmR3fBWlNqtYawiLw4m7bf15uEhbHUj3xZC00REYYqsvR', {apiVersion: "2022-08-01"} );

type CustomerData = {
    responsible_name: string,
    responsible_email: string,  
    company_name: string,
    address: string,
    responsible_phone_number: string,
    company_phone_number: string,
    description: string,
    cpf: string
};

export class HandleCreateCustomer {
    async handle({ company_name, responsible_name, responsible_email, address, responsible_phone_number, description, company_phone_number, cpf }: CustomerData) {
        try {
            const customer = await stripe.customers.create({
                email: responsible_email,
                name: responsible_name,
                shipping: {
                  address: {
                    country: 'BR',
                    line1: address,
                    postal_code: String(address).slice(-7, -16),
                  },
                  name: company_name,
                  phone: company_phone_number
                },
                address: {
                    country: 'BR',
                    line1: address,
                    postal_code: String(address).slice(-7, -16),
                },
                phone: responsible_phone_number,
                description
            });

            const existResponsible = await responsibleRepository().findOneBy({ cpf });

            if(existResponsible == null) {
                return new Error("Failed to find the company's responsible.");
            }

            existResponsible.customer_id = customer.id;

            await responsibleRepository().save(existResponsible);
            
            return customer.id;
        } catch (error) {
            return new Error(`Failed to create a customer. More details: ${error}`);
        }
    }
}
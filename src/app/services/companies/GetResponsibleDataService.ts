import jwt from 'jsonwebtoken';
import { compare } from "bcryptjs";
import { responsibleRepository } from "../../repositories";
import { stripe } from '../../helpers/stripe';

type LoginCompany = {
    userId: string
};

type Company = {
    id: string,
    isMainCompany: boolean
};

export class GetResponsibleDataService {
    async execute({ userId }: LoginCompany) {
        const hasUserId = userId;

        let subscription_result;

        if(!hasUserId) {
            return new Error("Missing responsible's informations");
        };

        const existingResponsible = await responsibleRepository().findOneBy({ id: userId });

        if(existingResponsible == null) {
            return new Error("Invalid Credentials.");
        };

        try {
            if(existingResponsible.subscription_id == null) {
                console.log("Responsible doesn't has a subscription.");
            } else {
                const subscription = await stripe.subscriptions.retrieve(existingResponsible.subscription_id);
            
                const paymentMethod = await stripe.customers.retrievePaymentMethod(
                    existingResponsible.customer_id,
                    subscription.default_payment_method as string,
                );

                const date =  new Date(subscription.current_period_start * 1000);

                subscription_result = {
                    id: subscription.id,
                    brand: paymentMethod.card?.brand,
                    payment_method: paymentMethod.card?.last4,
                    status: subscription.status,
                    date,
                    period_start: `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/${date.getMonth() + 1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1}/${date.getFullYear()}`
                }
            }

            

        } catch (error) {
            if(error instanceof Error) {
                console.log(`Failed to retrieve subscription data, more details: ${error.message}`);
            } else {
                console.log(`Something went wrong: ${error}`);
            }
        }

        let responsible_companies: Company[] = [];

        for(let i = 0; i < existingResponsible.companies.length; i++) {
            responsible_companies.push({
                id: existingResponsible.companies[i].id,
                isMainCompany: existingResponsible.companies[i].isMainCompany
            });
        }

        const result = { responsible_name: existingResponsible.responsible_name, email: existingResponsible.email, phone_number: existingResponsible.phone_number, id: existingResponsible.id, subscription_status: existingResponsible.subscription_status, responsible_companies, subscription_data: subscription_result};

        return result;
    };
};
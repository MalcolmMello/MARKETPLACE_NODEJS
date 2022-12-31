import { Request, Response } from "express";
import { stripe } from "../helpers/stripe";
import { responsibleRepository } from "../repositories";

export class HandleRetrieveSubscription {
    async handle(request: Request, response: Response) {
        const { userId } = request;

        const responsible = await responsibleRepository().findOneBy({ id: userId });
        
        if(responsible == null) {
            const error = new Error("Responsible doesn't exists.");
            return response.status(400).json({ message: error.message });
        }

        if(responsible.subscription_id == null) {
            return response.json({ status: responsible.subscription_id });
        }

        const subscription = await stripe.subscriptions.retrieve(responsible.subscription_id, {expand: ['latest_invoice.payment_intent']});
                
        responsible.subscription_status = subscription.status;

        await responsibleRepository().save(responsible);

        if(subscription.status === "active") {
            return response.json({ status: responsible.subscription_status });
        } else if(subscription.status === "past_due" || subscription.status === "incomplete") {
            return response.json({ status: responsible.subscription_status, clientSecret: subscription.latest_invoice?.payment_intent?.client_secret });
        } else {
            const status = "Seu plano mensal está inativo, vá para página de pagamento.";
            return response.json({ status });
        }
    }
}
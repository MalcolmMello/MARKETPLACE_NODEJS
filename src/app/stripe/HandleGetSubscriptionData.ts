import { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "../helpers/stripe";
import { responsibleRepository } from "../repositories";

export class HandleGetSubscriptionData {
    async handle(request: Request, response: Response) {
        const responsibleId = request.userId;

        const responsible = await responsibleRepository().findOneBy({ id: responsibleId });

        if(responsible == null) {
            const message = new Error("Responsible doesn't exists.");
            return response.status(400).json({ message });
        }

        if(responsible.subscription_id == null) {
            const message = new Error("That user doesn't have a subscription.");;
            return response.status(400).json({ message });
        }

        try {
            const subscription = await stripe.subscriptions.retrieve(responsible.subscription_id);
            
            const result = {
                id: subscription.id,
                payment_method: subscription.default_payment_method,
                status: subscription.status,
                period_start: new Date(subscription.current_period_start * 1000).toString() 
            }

            return response.json(result);
        } catch (error) {
            if(error instanceof Error) {
                return response.status(400).json({ message: error.message });
            }
            return response.status(400).json({ message: error });
        }
    }
}
import { Request, Response } from "express";
import { stripe } from "../helpers/stripe";
import { responsibleRepository } from "../repositories";

export class HandleCancelSubscription {
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
            const subscription = await stripe.subscriptions.del(responsible.subscription_id);
            
            const result = {
                id: subscription.id,
                status: subscription.status
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
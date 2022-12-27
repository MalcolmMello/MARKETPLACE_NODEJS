import { Request, Response } from "express";
import { responsibleRepository } from "../../repositories";
import { HandleCreateSubscription } from "../../stripe/HandleCreateSubscription";

const priceId = process.env.STRIPE_PRICE_ID;


export class CreateNewSubscriptionController {
    async handle(request: Request, response: Response) {
        const responsibleId = request.userId

        const createSubscription = new HandleCreateSubscription();

        const existResponsible = await responsibleRepository().findOneBy({ id: responsibleId });
       
        if(existResponsible == null) {
            return new Error("User doesn't exists");
        };

        const subscription = await createSubscription.handle({ responsibleId, customerId: existResponsible.customer_id, priceId });

        if(subscription instanceof Error) {
            return response.status(400).json(subscription.message);
        };

        return response.json({ clientSecret: subscription?.clientSecret, subscription_status: subscription?.status  });
    };
};
import { Request, Response } from 'express';
import { stripe } from '../helpers/stripe';
import { responsibleRepository } from '../repositories';

export class HandleCreateSubscription {
    async handle(request: Request, response: Response) {
        const { customerId, priceId } = request.body;
        
        try {

            const subscription = await stripe.subscriptions.create({
              customer: customerId,
              items: [{
                price: priceId,
              }],
              payment_behavior: 'default_incomplete',
              payment_settings: { save_default_payment_method: 'on_subscription' },
              expand: ['latest_invoice.payment_intent'],
            });

            const existResponsible = await responsibleRepository().findOneBy({ customer_id: customerId });

            if(existResponsible == null) {
                return new Error("Failed to find the company's responsible.");
            }

            existResponsible.subscription_id = subscription.id;

            existResponsible.subscription_status = subscription.status;

            await responsibleRepository().save(existResponsible);
        
            return response.json({ subscriptionId: subscription.id, clientSecret: subscription.latest_invoice?.payment_intent?.client_secret });
          } catch (error) {
            if(error instanceof Error) {
                return response.status(400).json(error.message);
            };
          }
        };
}

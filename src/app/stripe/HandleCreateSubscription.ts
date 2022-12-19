import { stripe } from '../helpers/stripe';
import { responsibleRepository } from '../repositories';

type CreateSubscription = {
  customerId: string,
  priceId: string,
  responsibleId: string
}

export class HandleCreateSubscription {
    async handle({ responsibleId, customerId, priceId }: CreateSubscription) {
        try {

            const subscription = await stripe.subscriptions.create({
              customer: customerId,
              items: [{
                price: priceId,
              }],
              payment_behavior: 'default_incomplete',
              payment_settings: { save_default_payment_method: 'on_subscription' },
              expand: ['latest_invoice.payment_intent'],
              collection_method: "charge_automatically"
            });

            const existResponsible = await responsibleRepository().findOneBy({ id: responsibleId, customer_id: customerId });

            if(existResponsible == null) {
                return new Error("Failed to find the company's responsible.");
            }

            existResponsible.subscription_id = subscription.id;

            existResponsible.subscription_status = subscription.status;

            await responsibleRepository().save(existResponsible);

            const result = { subscriptionId: subscription.id, clientSecret: subscription.latest_invoice?.payment_intent?.client_secret, status: subscription.status }
        
            return result;
          } catch (err) {
            if(err instanceof Error) {
              const error = err;
              return error;
            };
          }
        };
}

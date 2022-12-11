import { Router } from "express";
import { stripe } from "../app/helpers/stripe";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import { responsibleRepository } from "../app/repositories";

dotenv.config();


const routes = Router();

routes.post("/", bodyParser.raw({ type: "application/json" }), async (req, res) => {
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            req.headers["stripe-signature"] as string,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
    } catch (error) {
        console.log(error);
        console.log(`⚠️  Webhook signature verification failed.`);
        console.log(
          `⚠️  Check the env file and enter the correct webhook secret.`
        );
        return res.sendStatus(400);
    }
    
    const dataObject: any = event.data.object;

    switch (event.type) {
        case 'invoice.paid':
            const responsible = await responsibleRepository().findOneBy({ customer_id: dataObject.customer });
            
            if(responsible == null) {
                return new Error("Failed to find responsible by customer id");
            }

            if(responsible.subscription_id == null) {
                return new Error("There's no subscription with this responsible.");
            }

            const subscription = await stripe.subscriptions.retrieve(responsible.subscription_id);
            
            responsible.subscription_status = subscription.status;

            await responsibleRepository().save(responsible);
        break;
        case 'invoice.payment_failed':
            const failed_responsible = await responsibleRepository().findOneBy({ customer_id: dataObject.customer });
            
            if(failed_responsible == null) {
                return new Error("Failed to find responsible by customer id");
            }

            if(failed_responsible.subscription_id == null) {
                return new Error("There's no subscription with this responsible.");
            }

            const failed_subscription = await stripe.subscriptions.retrieve(failed_responsible.subscription_id);
                
            failed_responsible.subscription_status = failed_subscription.status;

            await responsibleRepository().save(failed_responsible);
        break;
        case 'customer.subscription.deleted':
            const canceled_responsible = await responsibleRepository().findOneBy({ customer_id: dataObject.customer });

            if(canceled_responsible == null) {
                return new Error("Failed to find responsible by customer id");
            }

            canceled_responsible.subscription_id = null;

            canceled_responsible.subscription_status = dataObject.status;

            await responsibleRepository().save(canceled_responsible);
        break;
        default:
            console.log(`No cases for: ${event.type}`);
      }
      res.sendStatus(200);
});

export default routes;
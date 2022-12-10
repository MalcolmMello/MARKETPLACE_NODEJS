import { Router } from "express";
import Stripe from "stripe";

import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY as string, {apiVersion: "2022-08-01"} );

const routes = Router();

routes.post("/webhook", async (req, res) => {
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
});

export default routes;
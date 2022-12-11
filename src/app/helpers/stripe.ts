import { Stripe } from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

export const stripe = new Stripe(process.env.STRIPE_KEY as string, {apiVersion: "2022-08-01"} );

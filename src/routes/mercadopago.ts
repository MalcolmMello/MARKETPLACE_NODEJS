import { Router } from "express";
import { NotificationsController } from "../app/controllers/mercadopago/NotificationsController";
import { OAuthController } from "../app/controllers/mercadopago/OAuthController";
import { PaymentController } from "../app/controllers/mercadopago/PaymentController";

import JwtAuthMiddleware from "../app/middlewares/JwtAuthMiddleware";

const routes = Router();

routes.get("/", new OAuthController().handle);
routes.post("/payment", JwtAuthMiddleware, new PaymentController().handle)
routes.post("/notifications", new NotificationsController().handle)

export default routes;
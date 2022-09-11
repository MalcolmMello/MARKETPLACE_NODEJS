import { Request, Response } from "express";
import { PaymentService } from "../../services/mercadopago/PaymentService";

export class PaymentController {
    async handle(request: Request, response: Response) {
        const { products, token } = request.body;
        const userId = request.userId;

        console.log(request.body)
        /* 
        const paymentService = new PaymentService();

        const result = await paymentService.execute({ products, userId, token });

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        };

        return response.json(result);

        */
    }
}
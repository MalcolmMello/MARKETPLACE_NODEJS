import { addressRepository, productsRepository, userRepository } from "../../repositories";
import mercadopago from "mercadopago";


type Payment = {
    products: {
        id: string,
        title: string,
        description: string,
        picture_url: string,
        quantity: number,
        currency_id: "BRL",
        unit_price: number
    }[],
    userId: string,
    token: string
}

export class PaymentService {
    async execute({ products, userId, token }: Payment) {

        mercadopago.configure({
            access_token: "",
        });

        let marketplace_taxes = 0;

        for(let product of products) {
            const foundProduct = await productsRepository().findOneBy({ id: product.id });
            
            if(foundProduct == null) {
                return new Error("Product doesn't exists.")
            }

            let taxe = foundProduct.price * 0.12;

            marketplace_taxes += taxe;
        };

        const user = await userRepository().findOneBy({ id: userId });

        if(user == null) {
            return new Error("User doesn't exists.")
        };

        const addresses = await addressRepository().findBy({ user_id: userId });

        if(addresses == null) {
            return new Error("User doesn't have any address.")
        };

        const paymentData = {
            token,
            transaction_amount: Number(body.transactionAmount),
            installments: Number(body.installments),
            issuer_id: body.issuerId,
            payer: {
                email: payer.email,
                identification: {
                  type: payer.identification.docType,
                  number: payer.identification.docNumber
                }
            },
            payment_method_id: body.paymentMethodId,
          };
    };
};
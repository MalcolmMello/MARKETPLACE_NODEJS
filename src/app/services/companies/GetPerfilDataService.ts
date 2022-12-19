import { companiesRepository, responsibleRepository } from "../../repositories";
import { stripe } from "../../helpers/stripe";

type GetPerfil = {
    userId: string,
    companyId: string
};

export class GetPerfilDataService {
    async execute({ userId, companyId }: GetPerfil) {
        const existResponsible = await responsibleRepository().findOneBy({ id: userId });

        if(existResponsible == null) {
            return new Error("Responsible doesn't exists");
        };

        const subscription = await stripe.subscriptions.retrieve(
            existResponsible.subscription_id as string
        );

        existResponsible.subscription_status = subscription.status;

        await responsibleRepository().save(existResponsible);

        if(!companyId) {
            return new Error("Company's id is missing.");
        };

        const existCompany = await companiesRepository().findOneBy({ id: companyId, responsible_id: userId });

        if(existCompany == null) {
            return new Error("Company doesn't exists");
        };

        const result = {
            company_name: existCompany.company_name,
            description: existCompany.description,
            phone_number: existCompany.phone_number,
            subscription_status: existResponsible.subscription_status,
            logo: existCompany.logo != null ? `http://localhost:5000/media/${existCompany.logo}.jpg` : existCompany.logo,
            cover: existCompany.cover != null ? `http://localhost:5000/media/${existCompany.cover}.jpg` : existCompany.cover
        };

        return result;
    }
}
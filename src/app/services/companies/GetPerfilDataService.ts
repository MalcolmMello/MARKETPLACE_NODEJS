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

        if(existCompany.stripeAccountId === null) {
            existCompany.onboardingComplete = false;

            await companiesRepository().save(existCompany);
        } else {
            try {
                const account = await stripe.accounts.retrieve(existCompany.stripeAccountId);
                
                if(account.details_submitted) {
                    existCompany.onboardingComplete = true;
    
                    await companiesRepository().save(existCompany);
    
                } else {
                    existCompany.onboardingComplete = false;
    
                    await companiesRepository().save(existCompany);
                }
                
            } catch (err) {
                const error = new Error(`Failed to retrieve Stripe account information. More details about the error: ${err}`);
            }
        }

        const result = {
            company_id: existCompany.id,
            company_name: existCompany.company_name,
            company_email: existCompany.email,
            description: existCompany.description,
            phone_number: existCompany.phone_number,
            cnpj: existCompany.cnpj,
            subscription_status: existResponsible.subscription_status,
            onboarding: existCompany.onboardingComplete,
            logo: existCompany.logo != null ? `http://localhost:5000/media/${existCompany.logo}.jpg` : existCompany.logo,
            cover: existCompany.cover != null ? `http://localhost:5000/media/${existCompany.cover}.jpg` : existCompany.cover
        };

        return result;
    }
}
import { companiesRepository } from "../../repositories";

interface OperatingRadius {
    radius: number,
    responsibleId: string,
    companyId: string
}

export class UpdateOperatingRadiusService {
    async execute({ radius, responsibleId, companyId }: OperatingRadius) {
        if(!radius) {
            return new Error("Send a valid radius");
        }

        const existCompany = await companiesRepository().findOneBy({ id: companyId, responsible_id: responsibleId });

        if(existCompany == null) {
            return new Error("Company does'n exist");
        }

        existCompany.radius = radius;

        await companiesRepository().save(existCompany);

        return {
            operatingRadius: radius
        };
    }
}
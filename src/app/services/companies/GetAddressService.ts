import { companiesRepository, addressRepository } from "../../repositories";

type GetAddress = {
    companyId: string,
    responsibleId: string
};

export class GetAddressService {
    async execute({ companyId, responsibleId}: GetAddress) {
        const hasId = companyId;
        
        if(!hasId) {
            return new Error("Missing company id");
        };

        const company = await companiesRepository().findOneBy({ id: companyId, responsible_id: responsibleId });

        if(company == null) {
            return new Error("Company doesn't exists");
        };

        const address = await addressRepository().findOneBy({ id: company.addressId });

        const result = {...address, number: company.address_number};
        
        return result;
    };
};
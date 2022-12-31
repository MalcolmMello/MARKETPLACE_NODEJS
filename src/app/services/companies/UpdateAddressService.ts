import { companiesRepository, addressRepository } from "../../repositories";

type UpdateAddress = {
    responsibleId: string,
    companyId: string, 
    display_name: string, 
    number: string, 
    lat: string, 
    long: string
};

export class UpdateAddressService {
    async execute({ responsibleId, companyId, display_name, number, lat, long}: UpdateAddress) {
        const hasId = companyId;
        
        if(!hasId) {
            return new Error("Missing company id");
        };

        const company = await companiesRepository().findOneBy({ id: companyId, responsible_id: responsibleId });

        if(company == null) {
            return new Error("Company doesn't exists");
        };

        const existAddress = await addressRepository().findOneBy({ display_name });

        if(existAddress) {
            company.addressId = existAddress.id
            company.address_number = number ? number : company.address_number;
            company.latitude = Number(lat);
            company.longitude = Number(long);
            
            await companiesRepository().save(company);

            const result = {
                ...existAddress,
                address_number: company.address_number
            };

            return result;
        }

        const newAddress = addressRepository().create({ display_name });
        
        await addressRepository().save(newAddress);

        company.addressId = newAddress.id;
        company.address_number = number ? number : company.address_number;
        company.latitude = Number(lat);
        company.longitude = Number(long);
                
        await companiesRepository().save(company);

        const result = {
            ...newAddress,
            number: company.address_number
        };

        return result;
    }
};
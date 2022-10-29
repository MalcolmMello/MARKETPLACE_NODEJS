import { api } from "../../helpers/IsAddressReal";
import { companiesRepository, addressRepository } from "../../repositories";

type UpdateAddress = {
    companyId: string,
    street: string,
    district: string,
    zip_code: string,
    city: string,
    state: string,
    country: string,
    address_number: string,
    longitude: number,
    latitude: number
};

type isAddressReal = {
    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    erro?: string
};

export class UpdateAddressService {
    async execute({companyId, street, district, zip_code, city, state, country, address_number, longitude, latitude}: UpdateAddress) {
        const hasId = companyId;
        
        if(!hasId) {
            return new Error("Missing company id");
        };

        const company = await companiesRepository().findOneBy({ id: companyId });

        if(company == null) {
            return new Error("Company doesn't exists");
        };

        const zipcode = zip_code.replace("-", "");

        const existAddress = await addressRepository().findOneBy({ zip_code: zipcode });

        if(existAddress) {
            const existCompany = await companiesRepository().findOneBy({ id: companyId });

            if(existCompany) {
                existCompany.addressId = existAddress.id
                existCompany.address_number = address_number ? address_number : existCompany.address_number;
                
                await companiesRepository().save(existCompany);

                const result = {
                    ...existAddress,
                    address_number: existCompany.address_number
                };

                return result;
            }
        };

        //if address doesn't exists, create and then create a new company

        let isAddressReal: isAddressReal = await api.foundAddressByZipCode(zipcode);

        if(isAddressReal.erro) {
            return new Error("Address doesn't exist");
        };

        const matchedAddress = isAddressReal.uf === state && isAddressReal.localidade === city && isAddressReal.bairro === district && isAddressReal.logradouro === street;
        
        if(matchedAddress) {
            const newAddress = addressRepository().create({ street, district, zip_code: zipcode, city, state, country, longitude, latitude });
        
            await addressRepository().save(newAddress);

            const existCompany = await companiesRepository().findOneBy({ id: companyId });

            if(existCompany) {
                existCompany.addressId = newAddress.id;
                existCompany.address_number = address_number ? address_number : existCompany.address_number;
                
                await companiesRepository().save(existCompany);

                const result = {
                    ...newAddress,
                    address_number: existCompany.address_number
                };

                return result;
            }
        } else {
            return new Error("Addresses doesn't match each other");
        }
        
    }
};
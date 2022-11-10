import { hash } from "bcryptjs";
import { addressRepository, companiesRepository } from '../../repositories';
import { api } from '../../helpers/IsAddressReal';

type CreateCompany = {
    company_name: string,
    email: string,
    password: string,
    phone_number: string,
    cnpj: string,
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

export class CreateCompanyService {
    async execute({ company_name, password, email, phone_number, cnpj, street, district, zip_code, city, state, country, address_number, longitude, latitude}: CreateCompany) {
        
        const hasAllCompanyData = company_name && password && email && phone_number && cnpj;
        
        if(!hasAllCompanyData) {
            return new Error("Missing company's informations");
        };

        const existCompany = await companiesRepository().findOneBy({ cnpj });

        if(existCompany) {
            return new Error("Company already exists");
        };

        const passwordHash = await hash(password, 8);

        const hasAllAddressData = street && district && zip_code && city && state && country && longitude && latitude;

        if(!hasAllAddressData) {
            return new Error("Missing company address's informations");
        };

        const existAddress = await addressRepository().findOneBy({ zip_code });

        if(existAddress) {
            const newCompany = companiesRepository().create({ company_name, email, password: passwordHash, phone_number, address_number, cnpj, addressId: existAddress.id});

            await companiesRepository().save(newCompany);

            const result = {
                id: newCompany.id,
                company_name: newCompany.company_name,
                phone_number: newCompany.phone_number,
                address_number: newCompany.address_number,
                cnpj: newCompany.cnpj,
                addressId: newCompany.addressId,
                logo: newCompany.logo,
                cover: newCompany.cover,
                isApproved: newCompany.isApproved
            };

            return result;
        };

        //if address doesn't exists, create, and then create a new company

        const zipcode = zip_code.replace("-", "");

        let isAddressReal: isAddressReal = await api.foundAddressByZipCode(zipcode);

        if(isAddressReal.erro) {
            return new Error("Address doesn't exist");
        };

        const matchedAddress = isAddressReal.uf === state && isAddressReal.localidade === city && isAddressReal.bairro === district && isAddressReal.logradouro === street;
        
        if(matchedAddress) {
            const newAddress = addressRepository().create({ street, district, zip_code, city, state, longitude, latitude });
        
            await addressRepository().save(newAddress);

            const newCompany = companiesRepository().create({ company_name, email, password: passwordHash, phone_number, address_number, cnpj, addressId: newAddress.id});

            await companiesRepository().save(newCompany);
            

            const result = {
                id: newCompany.id,
                company_name: newCompany.company_name,
                phone_number: newCompany.phone_number,
                address_number: newCompany.address_number,
                cnpj: newCompany.cnpj,
                addressId: newCompany.addressId,
                logo: newCompany.logo,
                cover: newCompany.cover,
                isApproved: newCompany.isApproved
            };

            return result;
        } else {
            return new Error("Addresses doesn't match each other");
        }
        
    }
}
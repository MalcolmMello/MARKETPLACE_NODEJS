import { hash } from "bcryptjs";
import jwt from 'jsonwebtoken';
import { addressRepository, companiesRepository, responsibleRepository } from '../../repositories';

type CreateAccount = {
    responsible_name: string,
    cpf: string,
    rg: string,
    responsible_email: string,
    responsible_password: string,
    responsible_phone_number: string,
    company_name: string,
    company_email: string,
    company_phone_number: string,
    description: string,
    cnpj: string,
    street: string,
    district: string,
    zip_code: string,
    city: string,
    state: string,
    address_number: string,
    longitude: number,
    latitude: number
};


export class CreateCompanyService {
    async execute({ responsible_name, cpf, rg, responsible_email, responsible_password, responsible_phone_number, company_name, company_email, company_phone_number, description, cnpj, street, district, zip_code, city, state, address_number, longitude, latitude }: CreateAccount) {
        const hasAllResponsibleData = responsible_name && cpf && rg && responsible_email && responsible_password;
        
        if(!hasAllResponsibleData) {
            return new Error("Missing responsible's informations");
        };

        const hasAllCompanyData = company_name && company_email && company_phone_number && description && cnpj;
        
        if(!hasAllCompanyData) {
            return new Error("Missing company's informations");
        };

        const existResponsible = await companiesRepository().findOneBy({ cnpj });

        if(existResponsible) {
            return new Error("User already exists");
        };

        const existCompany = await companiesRepository().findOneBy({ cnpj });

        if(existCompany) {
            return new Error("Company already exists");
        };

        const passwordHash = await hash(responsible_password, 8);

        const hasAllAddressData = street && district && zip_code && city && state && longitude && latitude;

        if(!hasAllAddressData) {
            return new Error("Missing company address's informations");
        };

        let address = await addressRepository().findOneBy({ zip_code });

        if(address == null) {
            const newAddress = addressRepository().create({ street, district, zip_code, city, state, longitude, latitude });    
            await addressRepository().save(newAddress);
            address = newAddress
        };

        const newResponsible = responsibleRepository().create({ responsible_name, email: responsible_email, password: passwordHash, phone_number: responsible_phone_number, rg, cpf });
            
        await companiesRepository().save(newResponsible);
            
        const newCompany = companiesRepository().create({ company_name, email: company_email, phone_number: company_phone_number, address_number, cnpj, addressId: address.id, responsible: newResponsible});

        await companiesRepository().save(newCompany);

        const token = jwt.sign({ email: newResponsible.email, id: newResponsible.id }, 'teste', { expiresIn: "1h" });

        const result = {
            company_id: newCompany.id,
            responsible_id: newResponsible.id,
            responsible_name,
            responsible_phone_number,
            company_name: newCompany.company_name,
            company_email: newCompany.email,
            phone_number: newCompany.phone_number,
            address_number: newCompany.address_number,
            street: address.street,
            district: address.district,
            zip_code: address.zip_code,
            city: address.city,
            state: address.state,
            cnpj: newCompany.cnpj,
            description: newCompany.description,
            addressId: newCompany.addressId,
            token,
            isApproved: newCompany.isApproved
        };

        return result;
    }
}
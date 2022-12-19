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
    display_name: string,
    address_number: string,
    longitude: number,
    latitude: number
};


export class CreateCompanyService {
    async execute({ responsible_name, cpf, rg, responsible_email, responsible_password, responsible_phone_number, company_name, company_email, company_phone_number, description, cnpj, display_name, address_number, longitude, latitude }: CreateAccount) {
        const hasAllResponsibleData = responsible_name && cpf && rg && responsible_email && responsible_password && responsible_phone_number;
        
        if(!hasAllResponsibleData) {
            return new Error("Missing responsible's informations");
        };

        const hasAllCompanyData = company_name && company_email && company_phone_number && description && cnpj;
        
        if(!hasAllCompanyData) {
            return new Error("Missing company's informations");
        };

        const existResponsible = await responsibleRepository().findOneBy({ cpf });

        if(existResponsible) {
            return new Error("User already exists");
        };

        const existCompany = await companiesRepository().findOneBy({ cnpj });

        if(existCompany) {
            return new Error("Company already exists");
        };

        const passwordHash = await hash(responsible_password, 8);

        const hasAllAddressData = display_name && longitude && latitude;

        if(!hasAllAddressData) {
            return new Error("Missing company address's informations");
        };

        let address = await addressRepository().findOneBy({ display_name });

        if(address == null) {
            const newAddress = addressRepository().create({ display_name });    
            await addressRepository().save(newAddress);
            address = newAddress
        };

        const newResponsible = responsibleRepository().create({ responsible_name, email: responsible_email, password: passwordHash, phone_number: responsible_phone_number, rg, cpf });
            
        await responsibleRepository().save(newResponsible);
            
        const newCompany = companiesRepository().create({ company_name, email: company_email, phone_number: company_phone_number, address_number, cnpj, addressId: address.id, responsible: newResponsible, latitude, longitude});

        await companiesRepository().save(newCompany);

        const token = jwt.sign({ email: newResponsible.email, id: newResponsible.id }, 'teste', { expiresIn: "1h" });

        const result = {
            company_id: newCompany.id,
            responsible_id: newResponsible.id,
            responsible_name,
            responsible_phone_number,
            responsible_email,
            cpf,
            onboarding: newCompany.onboardingComplete,
            company_name: newCompany.company_name,
            company_email: newCompany.email,
            phone_number: newCompany.phone_number,
            address_number: newCompany.address_number,
            display_name,
            token,
            cnpj: newCompany.cnpj,
            description: newCompany.description,
            addressId: newCompany.addressId,
            isApproved: newCompany.isApproved
        };

        return result;
    }
}
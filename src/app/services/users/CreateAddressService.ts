import { addressRepository } from "../../repositories";
import { userRepository } from "../../repositories";
import { api } from '../../helpers/IsAddressReal';

type CreateAddress = {
    userId: string,
    street: string,
    district: string,
    zip_code: string,
    city: string,
    state: string,
    country: string,
    longitude: number,
    latitude: number
}

type isAddressReal = {
    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    erro?: string
};

export class CreateAddressService {
    async execute({ userId, street, district, zip_code, city, state, country, longitude, latitude }: CreateAddress) {
        const hasAllData = userId && street && district && zip_code && city && state && country && longitude && latitude;

        if(!hasAllData) {
            return new Error("Missing address's informations");
        };

        const existUser = await userRepository().findOneBy({ id: userId });

        if(!existUser) {
            return new Error("User doesn't exists");
        };

        const existAddress = await addressRepository().findOneBy({ zip_code });

        if(existAddress) {

            for(let address of existUser.address) {
                if(address.id === existAddress.id) {
                    return new Error("Address already exists in that user");
                }
            }

            existUser.address = [...existUser.address, existAddress];

            const updatedUser = await userRepository().save(existUser);

            const result = {
                username: updatedUser.username,
                address_number: updatedUser.address_number,
                created_at: updatedUser.created_at,
                updated_at: updatedUser.updated_at,
                address: updatedUser.address
            };

            return result;
        };

        const zipcode = zip_code.replace("-", "");

        let isAddressReal: isAddressReal = await api.foundAddressByZipCode(zipcode);

        if(isAddressReal.erro) {
            return new Error("Address doesn't exist");
        };

        const matchedAddress = isAddressReal.uf === state && isAddressReal.localidade === city && isAddressReal.bairro === district && isAddressReal.logradouro === street;

        if(matchedAddress) {
            const newAddress = addressRepository().create({ street, district, zip_code, city, state, longitude, latitude });
        
            await addressRepository().save(newAddress);

            existUser.address = [...existUser.address, newAddress];

            const updatedUser = await userRepository().save(existUser);

            const result = {
                username: updatedUser.username,
                address_number: updatedUser.address_number,
                created_at: updatedUser.created_at,
                updated_at: updatedUser.updated_at,
                address: updatedUser.address
            };

            return result;
        } else {
            return new Error("Addresses doesn't match each other");
        }
    };
};
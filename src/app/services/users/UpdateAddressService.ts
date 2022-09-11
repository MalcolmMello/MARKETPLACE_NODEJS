import { api } from "../../helpers/IsAddressReal";
import { addressRepository, userRepository } from "../../repositories";

type UpdateAddress = {
    userId: string,
    id: string,
    number: string,
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

export class UpdateAddressService {
    async execute({ userId, id, number, street, district, zip_code, city, state, country, longitude, latitude }: UpdateAddress) {
        const hasAllData = userId && street && district && zip_code && city && state && country && longitude && latitude;

        if(!hasAllData) {
            return new Error("Missing address's informations");
        };

        const existUser = await userRepository().findOneBy({ id: userId });

        if(existUser == null) {
            return new Error("User doesn't exists.");
        };

        existUser.address = existUser.address.filter((address) => {
            return address.id !== id;
        });

        existUser.address_number = number ? number : existUser.address_number;

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
            const newAddress = addressRepository().create({ street, district, zip_code, city, state, country, longitude, latitude });
        
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
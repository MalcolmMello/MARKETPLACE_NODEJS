import { addressRepository, userRepository } from "../../repositories";

type GetOneAddress = {
    id: string,
    userId: string
};

export class GetOneAddressService {
    async execute({id, userId}: GetOneAddress) {
        const hasId = id;
        
        if(!hasId) {
            return new Error("Missing address id");
        };

        const user = await userRepository().findOneBy({ id: userId });

        if(user == null) {
            return new Error("User doesn't exists");
        };

        const result = [];

        for(let address of user.address) {
            if(address.id === id) {
                return address;
            }
        };

        const message = 'There are no address with that id';

        return message;
    };
};
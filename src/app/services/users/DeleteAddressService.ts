import { addressRepository, userRepository } from "../../repositories";

type DeleteAddress = {
    id: string,
    userId: string
};

export class DeleteAddressService {
    async execute({id, userId}: DeleteAddress) {
        const hasId = id;

        if(!hasId) {
            return new Error("id is missing");
        };

        const user = await userRepository().findOneBy({ id: userId });

        if(user == null) {
            return new Error("User doesn't exists.")
        };

        user.address = user?.address.filter((address) => {
            return address.id !== id;
        });

        await userRepository().save(user);

        const message = 'Address sucessfuly removed!';

        return message;
    };
};
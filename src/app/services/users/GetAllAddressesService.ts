import { companiesRepository, userRepository } from "../../repositories";

export class GetAllAddressesService {
    async execute(id: string) {
        const hasId = id;
        
        if(!hasId) {
            return new Error("Missing user id");
        };

        const user = await userRepository().findOneBy({ id });

        if(user == null) {
            return new Error("User doesn't exists.");
        };

        const result = {
            name: user.username,
            addresses: user.address
        } 

        return result;
    };
};
import { userRepository } from "../../repositories";

export class GetUserInfoService {
    async execute(id: string) {
        const hasId = id;

        if(!hasId) {
            return new Error("Missing address id");
        };

        const user = await userRepository().findOneBy({ id });

        if(user == null) {
            return new Error("No users with that id");
        };

        const userData = {
            id: user.id,
            username: user.username,
            email: user.email,
            phone_number: user.phone_number,
            addresses: user.address
        };

        return userData;
    }
}
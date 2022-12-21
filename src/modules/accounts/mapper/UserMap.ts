import { instanceToInstance } from "class-transformer";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
    static toDTO({
        email,
        name,
        id,
        avatar,
        driver_license,
        avatarURL,
    }: User): IUserResponseDTO {
        const user = instanceToInstance({
            email,
            name,
            id,
            avatar,
            driver_license,
            avatarURL,
        });
        return user;
    }
}

export { UserMap };

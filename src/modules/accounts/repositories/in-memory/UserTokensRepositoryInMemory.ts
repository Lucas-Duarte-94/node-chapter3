import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUserTokensRepository } from "../IUserTokensRepository";

class UserTokensRepositoryInMemory implements IUserTokensRepository {
    userTokens: UserTokens[] = [];
    async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
        const newUserToken = new UserTokens();

        Object.assign(newUserToken, {
            ...data,
        });

        this.userTokens.push(newUserToken);

        return newUserToken;
    }
    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens> {
        const userTokens = this.userTokens.find(
            (token) =>
                token.refresh_token === refresh_token &&
                token.user_id === user_id
        );

        return userTokens;
    }
    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userTokens = this.userTokens.find(
            (token) => token.refresh_token === refresh_token
        );

        return userTokens;
    }
    async deleteById(id: string): Promise<void> {
        const userToken = this.userTokens.find((ut) => ut.id === id);
        this.userTokens.splice(this.userTokens.indexOf(userToken));
    }
}

export { UserTokensRepositoryInMemory };

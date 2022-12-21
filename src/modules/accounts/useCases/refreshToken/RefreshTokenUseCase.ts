import auth from "@config/auth";
import { AppError } from "@errors/AppError";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UserTokensRepository")
        private usersTokenRepository: IUserTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<ITokenResponse> {
        const { email, sub } = verify(
            token,
            auth.refresh_secret_token
        ) as IPayload;

        const userToken =
            await this.usersTokenRepository.findByUserIdAndRefreshToken(
                sub,
                token
            );

        if (!userToken) {
            throw new AppError("Refresh token does not exists!");
        }

        await this.usersTokenRepository.deleteById(userToken.id);

        const refresh_token = sign({ email }, auth.refresh_secret_token, {
            subject: sub,
            expiresIn: auth.refresh_token_expires_in,
        });

        const refresh_token_expires_date = this.dateProvider.addDays(
            auth.refresh_token_expires_days
        );

        await this.usersTokenRepository.create({
            expires_date: refresh_token_expires_date,
            refresh_token,
            user_id: sub,
        });

        const newToken = sign({}, auth.secret_token, {
            subject: sub,
            expiresIn: auth.token_expires_in,
        });

        const returnData = {
            refresh_token,
            token: newToken,
        };

        return returnData;
    }
}

export { RefreshTokenUseCase };

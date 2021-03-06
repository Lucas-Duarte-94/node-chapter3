import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("token is missing!", 401)
    }
    
    const [, token] = authHeader.split(" ")

    try{
        const { sub: user_id } = verify(token, "4f7cb5b24fed2fc955bd5815abba5374") as IPayload;
        
        const usersRepository = new UsersRepository()
        const user = await usersRepository.findById(user_id);

        if(!user) {
            throw new AppError("User does not exists!", 401)
        }

        next()
    }catch(error) {
        throw new AppError("Invalid token!", 401)
    }
}
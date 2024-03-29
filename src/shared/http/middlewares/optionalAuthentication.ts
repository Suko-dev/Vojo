import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "../../../config/auth";
import { UsersRepository } from "../../../modules/user/repository/typeorm/UsersRepository";

interface IPayload {
    sub: string;
}
export async function optionalAuthentication(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const authHeader = request.headers.authorization;

    try {
        if (authHeader) {
            const [, token] = authHeader.split(" ");
            const { sub } = verify(token, auth.secret_token) as IPayload;

            const usersRepository = new UsersRepository();
            const user = await usersRepository.findByEmail(sub);
            if (!user) {
                throw new Error("user not found");
            }
            request.user = { email: user.email, token };
        }
        next();
    } catch (error) {
        next(error);
    }
}

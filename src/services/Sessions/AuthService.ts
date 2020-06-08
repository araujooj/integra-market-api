import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Market from '../../models/Market';
import authConfig from '../../config/auth';
import AppError from '../../errors/AppError';

interface Request {
    email: string;
    password: string;
}

interface Response {
    market: Market;
    token: string;
}

export default class AuthService {
    public async execute({ email, password }: Request): Promise<Response> {
        const marketRepository = getRepository(Market);

        const market = await marketRepository.findOne({
            where: { email },
        });

        if (!market) {
            throw new AppError('Incorrect email / password combination', 401);
        }

        const passwordMatch = await compare(password, market.password);

        if (!passwordMatch) {
            throw new AppError('Incorrect email / password combination', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: market.id,
            expiresIn,
        });

        return {
            market,
            token,
        };
    }
}
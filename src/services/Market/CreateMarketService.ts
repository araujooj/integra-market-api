import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Market from '../../models/Market';
import AppError from '../../errors/AppError';

interface Request {
    name: string;
    email: string;
    password: string;
}

export default class CreateMarketService {
    public async execute({ name, email, password }: Request): Promise<Market> {
        const marketRepository = getRepository(Market);

        const checkMarketExists = await marketRepository.findOne({
            where: { email },
        });

        if (checkMarketExists) {
            throw new AppError('Email already exists', 401);
        }

        const hashedPassword = await hash(password, 8);

        const market = marketRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await marketRepository.save(market);

        return market;
    }
}
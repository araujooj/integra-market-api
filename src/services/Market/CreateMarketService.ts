import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Market from '../../models/Market';
import AppError from '../../errors/AppError';
import MarketRepository from '../../repositories/marketRepository';

interface Request {
  name: string;
  email: string;
  password: string;
  city: string;
}

export default class CreateMarketService {
  public async execute({
    name,
    email,
    password,
    city,
  }: Request): Promise<Market> {
    const marketRepository = getCustomRepository(MarketRepository);

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
      city,
    });

    await marketRepository.save(market);

    return market;
  }
}

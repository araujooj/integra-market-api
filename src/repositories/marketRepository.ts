import { EntityRepository, Repository, Like } from 'typeorm';
import Market from '../models/Market';

interface Request {
  city: string;
  skip: number;
  take: number;
}

@EntityRepository(Market)
class MarketRepository extends Repository<Market> {
  public async findByCity({ city, skip, take }: Request): Promise<Market[]> {
    const market = await this.find({
      where: {
        city: Like(`%${city}%`),
      },
      skip,
      take,
    });

    market.forEach(markets => delete markets.password);

    return market;
  }
}

export default MarketRepository;

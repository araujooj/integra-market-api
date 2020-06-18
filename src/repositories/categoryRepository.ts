import { EntityRepository, Repository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import decrypt from '../utils/decrypt';
import Market from '../models/Market';
import Category from '../models/Category';

interface Request {
  market_id: string;
  skip: number;
  take: number;
}

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {
  public async findAndDecrypt({
    market_id,
    skip,
    take,
  }: Request): Promise<Category[]> {
    const marketRepo = getRepository(Market);

    const market = await marketRepo.findOne(market_id);

    if (!market) {
      throw new AppError(
        'You need to inform which one supermarket have this category',
        401,
      );
    }

    const categories = await this.find({
      where: {
        secret: true,
        market: market_id,
      },
      skip,
      take,
    });

    categories.forEach(category => {
      category.title = decrypt(category.title);
    });

    return categories;
  }
}

export default CategoryRepository;

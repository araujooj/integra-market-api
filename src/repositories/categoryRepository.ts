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
  }: Request): Promise<Category[]> {}
}

export default CategoryRepository;

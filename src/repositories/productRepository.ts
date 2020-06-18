import { EntityRepository, Repository, getRepository, Like } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import AppError from '../errors/AppError';
import decrypt from '../utils/decrypt';
import Market from '../models/Market';
import Product from '../models/Products';

interface RequestToDecrypt {
  market_id: string;
  skip: number;
  take: number;
}

interface RequestProduct extends RequestToDecrypt {
  product: string;
}

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  public async findAndDecrypt({
    market_id,
    skip,
    take,
  }: RequestToDecrypt): Promise<Product[]> {
    const marketRepo = getRepository(Market);

    const market = await marketRepo.findOne(market_id);

    if (!market) {
      throw new AppError(
        'You need to inform which one supermarket have this product',
        401,
      );
    }

    const products = await this.find({
      where: {
        secret: true,
        market: market_id,
      },
      skip,
      take,
    });

    products.forEach(product => {
      product.name = decrypt(product.name);
      product.category.title = decrypt(product.category.title);
    });

    return products;
  }

  public async findByProduct({
    market_id,
    skip,
    take,
    product,
  }: RequestProduct): Promise<Product[]> {
    const marketRepo = getRepository(Market);

    const market = await marketRepo.findOne(market_id);

    if (!market) {
      throw new AppError(
        'You need to inform which one supermarket have this product',
        401,
      );
    }

    const products = await this.find({
      where: {
        product: Like(`%${product}%`),
        secret: false,
        market: market_id,
      },
      skip,
      take,
    });

    return products;
  }
}

export default ProductRepository;

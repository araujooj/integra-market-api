import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Product from '../../models/Products';
import Market from '../../models/Market';
import ProductRepository from '../../repositories/productRepository';

interface Request {
  name: string;
  price: number;
  promotion: boolean;
  category: string;
  market_id: string;
  secret: boolean;
  unit: 'KG' | 'G' | 'UN';
  quantity: number;
}

export default class CreateProductService {
  public async execute({
    name,
    price,
    promotion,
    category,
    market_id,
    secret,
    unit,
    quantity,
  }: Request): Promise<Product> {
    const productRepo = getCustomRepository(ProductRepository);
    const marketRepo = getRepository(Market);

    const market = await marketRepo.findOne(market_id);

    if (!market) {
      throw new AppError(
        'You need to inform which one supermarket have this product',
        401,
      );
    }

    let getCategory = await productRepo.findOne({
      where: { category, market: market_id },
    });

    if (getCategory) {
      const product = productRepo.create({
        name,
        price,
        promotion,
        category: getCategory.category,
        secret,
        unit,
        quantity,
      });

      await productRepo.save(product);

      return product;
    }

    const product = productRepo.create({
      name,
      price,
      promotion,
      category,
      secret,
      unit,
      quantity,
    });

    await productRepo.save(product);

    return product;
  }
}

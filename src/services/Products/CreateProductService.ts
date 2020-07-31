import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Product from '../../models/Products';
import Market from '../../models/Market';
import ProductRepository from '../../repositories/productRepository';
import MarketProducts from '../../models/MarketProducts';

interface Request {
  name: string;
  gtin: string;
  category: string;
  market_id: string;
  price: number;
  secret: boolean;
  promotion: boolean;
  quantity: number;
}

export default class CreateProductService {
  public async execute({
    name,
    gtin,
    category,
    market_id,
    price,
    secret = false,
    promotion = false,
    quantity,
  }: Request): Promise<Product | MarketProducts> {
    const productRepository = getCustomRepository(ProductRepository);
    const marketProductRepository = getRepository(MarketProducts);

    const findGtin = await productRepository.findOne({
      where: {
        gtin,
      },
    });

    if (findGtin) {
      const marketProduct = marketProductRepository.create({
        market: {
          id: market_id,
        },
        product: {
          id: findGtin.id,
        },
        price,
        quantity,
        secret,
        promotion,
      });

      await marketProductRepository.save(marketProduct);

      return marketProduct;
    }

    const product = productRepository.create({
      name,
      gtin,
      category,
      image: 'aaaa.jpg',
    });

    await productRepository.save(product);

    const marketProduct = marketProductRepository.create({
      market: {
        id: market_id,
      },
      product: {
        id: product.id,
      },
      price,
      quantity,
      secret,
      promotion,
    });

    await marketProductRepository.save(marketProduct);

    return product;
  }
}

import { getRepository, getCustomRepository } from 'typeorm';
import encrypt from '../../utils/encrypt';
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
}


export default class CreateProductService {
    public async execute({ name, price, promotion, category, market_id, secret }: Request): Promise<Product> {
        const productRepo = getCustomRepository(ProductRepository);
        const marketRepo = getRepository(Market)

        const market = await marketRepo.findOne(market_id)

        if (!market) {
            throw new AppError('You need to inform which one supermarket have this product', 401)
        }

        if (secret) {

            const product = productRepo.create({
                name: encrypt(name),
                price,
                promotion,
                category: encrypt(category),
                market: {
                    id: market.id,
                    name: encrypt(market.name)
                },
                secret
            })

            await productRepo.save(product);

            return product;
        }

        const product = productRepo.create({
            name,
            price,
            promotion,
            category,
            market: {
                id: market.id,
                name: market.name
            },
            secret
        })

        await productRepo.save(product);

        return product;
    }
} 
import { getRepository, getCustomRepository, UpdateResult } from 'typeorm';
import encrypt from '../../utils/encrypt';
import AppError from '../../errors/AppError';
import Market from '../../models/Market';
import ProductRepository from '../../repositories/productRepository';
import decrypt from '../../utils/decrypt';

interface Request {
    name: string;
    price: number;
    promotion: boolean;
    category: string;
    market_id: string;
    product_id: string;
    secret: boolean;
}


export default class UpdateProductService {
    public async execute({ name, price, promotion, category, market_id, secret, product_id }: Request): Promise<UpdateResult> {
        const productRepo = getCustomRepository(ProductRepository);
        const marketRepo = getRepository(Market)

        const market = await marketRepo.findOne(market_id)
        const product = await productRepo.findOne(product_id);

        if (!product) {
            throw new AppError('Product ID Not Found', 404);
        }

        if (!market) {
            throw new AppError('You need to inform which one supermarket have this product', 401)
        }

        if (product.secret || secret) {
            const updateSecretProduct = await productRepo.update(product, {
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

            return updateSecretProduct;
        }

        const updateSecretProduct = await productRepo.update(product, {
            name: decrypt(name),
            price,
            promotion,
            category: decrypt(category),
            market: {
                id: market.id,
                name: decrypt(market.name)
            },
            secret
        })

        return updateSecretProduct;
    }
} 
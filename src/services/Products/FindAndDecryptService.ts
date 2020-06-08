import { getRepository } from 'typeorm';
import decrypt from '../../utils/decrypt';
import AppError from '../../errors/AppError';
import Product from '../../models/Products';
import Market from '../../models/Market';

export default class FindAndDecryptService {
    public async execute(market_id: string): Promise<Product[] | undefined> {
        const productRepository = getRepository(Product);

        const marketRepo = getRepository(Market)

        const market = await marketRepo.findOne(market_id)

        if (!market) {
            throw new AppError('You need to inform which one supermarket have this product', 401)
        }

        const products = await productRepository.find({
            where: {
                secret: true,
                market: market_id
            },
            loadEagerRelations: false,
        });

        products.forEach(product => {
            product.category = decrypt(product.category);
            product.name = decrypt(product.name)
        })

        return products;
    }
}
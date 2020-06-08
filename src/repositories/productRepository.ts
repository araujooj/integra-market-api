import { EntityRepository, Repository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import decrypt from '../utils/decrypt';
import Market from '../models/Market';
import Product from '../models/Products';


@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
    public async findAndDecrypt(market_id: string): Promise<Product[]> {

        const marketRepo = getRepository(Market)

        const market = await marketRepo.findOne(market_id)

        if (!market) {
            throw new AppError('You need to inform which one supermarket have this product', 401)
        }

        const products = await this.find({
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

export default ProductRepository;

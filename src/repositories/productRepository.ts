import { EntityRepository, Repository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import decrypt from '../utils/decrypt';
import Market from '../models/Market';
import Product from '../models/Products';

interface Request {
    market_id: string;
    skip: number;
    take: number;
}


@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
    public async findAndDecrypt({ market_id, skip, take }: Request): Promise<Product[]> {

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
            skip,
            take,
        });

        products.forEach(product => {
            product.name = decrypt(product.name)
        })

        console.log(products)

        return products;
    }
}

export default ProductRepository;

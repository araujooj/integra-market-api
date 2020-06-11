import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Product from '../../models/Products';
import Market from '../../models/Market';
import ProductRepository from '../../repositories/productRepository';
import Category from '../../models/Category';

interface Request {
    name: string;
    price: number;
    promotion: boolean;
    category: string;
    market_id: string;
    secret: boolean;
    unit: "KG" | "G" | "UN";
    quantity: number;
}


export default class CreatePublicProductService {
    public async execute({ name, price, promotion, category, market_id, secret, unit, quantity }: Request): Promise<Product> {
        const productRepo = getCustomRepository(ProductRepository);
        const categoryRepo = getRepository(Category);
        const marketRepo = getRepository(Market)

        const market = await marketRepo.findOne(market_id)

        if (!market) {
            throw new AppError('You need to inform which one supermarket have this product', 401)
        }

        let getCategory = await categoryRepo.findOne({
            where: { title: category },
        });

        if (!getCategory) {
            getCategory = categoryRepo.create({ title: category });
            await categoryRepo.save(getCategory);
        }

        const product = productRepo.create({
            name,
            price,
            promotion,
            category: {
                id: getCategory.id,
                title: getCategory.title
            },
            market: {
                id: market.id,
                name: market.name
            },
            secret,
            unit,
            quantity
        })

        await productRepo.save(product);

        return product;
    }
} 
import { getRepository, getCustomRepository } from 'typeorm';
import encrypt from '../../utils/encrypt';
import AppError from '../../errors/AppError';
import Product from '../../models/Products';
import Market from '../../models/Market';
import ProductRepository from '../../repositories/productRepository';
import Category from '../../models/Category';
import decrypt from '../../utils/decrypt';

interface Request {
    name: string;
    price: number;
    promotion: boolean;
    category: string;
    market_id: string;
    secret: boolean;
}


export default class CreatePrivateProductService {
    public async execute({ name, price, promotion, category, market_id, secret }: Request): Promise<Product> {
        const productRepo = getCustomRepository(ProductRepository);
        const categoryRepo = getRepository(Category);
        const marketRepo = getRepository(Market)

        const market = await marketRepo.findOne(market_id)

        if (!market) {
            throw new AppError('You need to inform which one supermarket have this product', 401)
        }

        const allCategories = await categoryRepo.find({
            where: {
                secret: true
            }
        })

        allCategories.forEach(categories => {
            categories.title = decrypt(categories.title)
        })

        const findCategory = allCategories.filter(categories => categories.title === category);

        if (!allCategories[0] || !findCategory[0]) {
            const newCategory = categoryRepo.create({ title: encrypt(category), secret: true });
            await categoryRepo.save(newCategory);

            const product = productRepo.create({
                name: encrypt(name),
                price,
                promotion,
                category: {
                    id: newCategory.id,
                    title: encrypt(newCategory.title)
                },
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
            name: encrypt(name),
            price,
            promotion,
            category: {
                id: findCategory[0].id,
                title: encrypt(findCategory[0].title)
            },
            market: {
                id: market.id,
                name: encrypt(market.name)
            },
            secret
        })

        await productRepo.save(product);

        return product;
    }
} 
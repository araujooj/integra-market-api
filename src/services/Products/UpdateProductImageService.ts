import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../../config/upload';
import Product from '../../models/Products';
import AppError from '../../errors/AppError';

interface Request {
    product_id: string;
    imageFilename: string;
}

export default class UpdateProductImageService {
    public async execute({ product_id, imageFilename }: Request): Promise<Product> {
        const productRepository = getRepository(Product);

        const product = await productRepository.findOne(product_id);

        if (!product) {
            throw new AppError('You need to inform a real product to update the image', 401);
        }

        if (product.image) {
            const productAvatarFilePath = path.join(uploadConfig.directory, product.image);

            const productAvatarFileExists = await fs.promises.stat(productAvatarFilePath);

            if (productAvatarFileExists) {
                await fs.promises.unlink(productAvatarFilePath);
            }
        }

        product.image = imageFilename;

        await productRepository.save(product);

        return product;
    }
}
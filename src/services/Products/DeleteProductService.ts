import { DeleteResult, getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Product from '../../models/Products'

class DeleteProductService {
    public async execute(id: string): Promise<DeleteResult> {
        const productRepository = getRepository(Product);

        const productExist = await productRepository.findOne({
            where: { id },
        });

        if (!productExist) {
            throw new AppError('This uuid is invalid', 401);
        }

        const product = await productRepository.delete(id);

        return product;
    }
}

export default DeleteProductService;

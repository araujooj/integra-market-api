import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ensureAuth from '../middlewares/ensureAuth'
import ProductRepository from '../repositories/productRepository';
import CreateProductService from '../services/Products/CreateProductService';
import usePagination from '../middlewares/usePagination';

const productRouter = Router();

productRouter.use(usePagination)

productRouter.get('/public/:marketId', async (request, response) => {
    const { marketId } = request.params
    const productRepository = getCustomRepository(ProductRepository);

    const products = await productRepository.find(
        {
            where: {
                market: marketId,
                secret: false,
            },
            skip: request.pagination.realPage,
            take: request.pagination.realTake,
        }
    )

    return response.json(products)
});

productRouter.get('/public/:marketId/:productId', async (request, response) => {
    const { marketId, productId } = request.params
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(
        {
            where: {
                market: marketId,
                secret: false,
                id: productId
            }
        }
    )

    return response.json(product)
});

productRouter.use(ensureAuth)

productRouter.get('/private', async (request, response) => {
    const productRepository = getCustomRepository(ProductRepository);
    const market_id = request.market.id;
    const products = await productRepository.findAndDecrypt(market_id)

    return response.json(products)
});

productRouter.post('/create', async (request, response) => {
    const { name, price, promotion, category, secret } = request.body;

    const createProduct = new CreateProductService;

    const product = await createProduct.execute({
        name,
        price,
        promotion,
        category,
        secret,
        market_id: request.market.id
    })

    return response.json(product)
});

productRouter.put('/change/:id', async (request, response) => {
    const { id } = request.params;

    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne({
        where: id
    })

    return response.json(product)
});


export default productRouter;

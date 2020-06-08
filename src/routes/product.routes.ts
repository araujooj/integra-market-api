import { Router } from 'express';
import { getRepository } from 'typeorm';
import ensureAuth from '../middlewares/ensureAuth'
import CreateProductService from '../services/Products/CreateProductService';
import Product from '../models/Products';
import FindAndDecryptService from '../services/Products/FindAndDecryptService';

const productRouter = Router();

productRouter.get('/public/:marketId', async (request, response) => {
    // TODO
});

productRouter.use(ensureAuth)

productRouter.get('/private', async (request, response) => {
    const findProducts = new FindAndDecryptService
    const market_id = request.market.id;
    const products = await findProducts.execute(market_id)

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
    // TODO
});


export default productRouter;

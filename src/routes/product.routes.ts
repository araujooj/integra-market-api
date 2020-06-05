import { Router } from 'express';
import ensureAuth from '../middlewares/ensureAuth'
import CreateProductService from '../services/Products/CreateProductService';

const productRouter = Router();

productRouter.get('/:marketId/public/products', async (request, response) => {
    // TODO
});

productRouter.use(ensureAuth)

productRouter.get('/private/products', async (request, response) => {
    // TODO
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
        market_id: request.user.id
    })

    return response.json(product)
});


export default productRouter;

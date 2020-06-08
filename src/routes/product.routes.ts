import { Router } from 'express';
import { getRepository, Like } from 'typeorm';
import ensureAuth from '../middlewares/ensureAuth'
import CreateProductService from '../services/Products/CreateProductService';
import Product from '../models/Products';
import FindAndDecryptService from '../services/Products/FindAndDecryptService';

const productRouter = Router();

productRouter.get('/public/:marketId', async (request, response) => {
    // TODO - Abstract this on a middleware
    let { perPage, page, } = request.query;
    const { ...q } = request.query;
    let realPage: number;
    let realTake: number;
    if (perPage) realTake = +perPage;
    else {
        perPage = '10';
        realTake = 10;
    }
    if (page) realPage = +page === 1 ? 0 : (+page - 1) * realTake;
    else {
        realPage = 0;
        page = '1';
    }
    const findOptions = {
        take: realTake,
        skip: realPage,
        where: { ...q },
    };
    if (!q) delete findOptions.where;
    const { marketId } = request.params
    const productRepository = getRepository(Product);

    const products = await productRepository.find(
        {
            where: {
                market: marketId,
                secret: false,
            },
            skip: realPage,
            take: realTake,
        }
    )

    return response.json(products)
});

productRouter.get('/public/:marketId/:productId', async (request, response) => {
    const { marketId, productId } = request.params
    const productRepository = getRepository(Product);

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
    const { id } = request.params;

    const productRepository = getRepository(Product);

    const product = await productRepository.findOne({
        where: id
    })

    return response.json(product)
});


export default productRouter;

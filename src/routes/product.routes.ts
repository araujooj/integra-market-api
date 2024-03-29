import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import ensureAuth from '../middlewares/ensureAuth';
import usePagination from '../middlewares/usePagination';
import CreateProductService from '../services/Products/CreateProductService';
import DeleteProductService from '../services/Products/DeleteProductService';
import { getCustomRepository, getRepository, Like } from 'typeorm';
import ProductRepository from '../repositories/productRepository';
import MarketProducts from '../models/MarketProducts';

const upload = multer(uploadConfig);
const productRouter = Router();

productRouter.use(usePagination);

productRouter.get('/:market_id', async (request, response) => {
  const { market_id } = request.params;
  const { product_name, product_category, secret = false } = request.query;
  const marketProductRepository = getRepository(MarketProducts);

  if (product_name) {
    const product = await marketProductRepository.find({
      where: {
        market_id,
        product_name: Like(`%${product_name}%`),
        secret,
      },
      skip: request.pagination.realPage,
      take: request.pagination.realTake,
    });

    return response.json(product);
  }

  if (product_category) {
    const product = await marketProductRepository.find({
      where: {
        market_id,
        product_category: Like(`%${product_category}%`),
        secret,
      },
      skip: request.pagination.realPage,
      take: request.pagination.realTake,
    });

    return response.json(product);
  }

  if (product_name && product_category) {
    const product = await marketProductRepository.find({
      where: {
        market_id,
        product_name: Like(`%${product_name}%`),
        product_category: Like(`%${product_category}%`),
        secret,
      },
      skip: request.pagination.realPage,
      take: request.pagination.realTake,
    });

    return response.json(product);
  }

  const product = await marketProductRepository.find({
    where: {
      market_id,
      secret,
    },
    skip: request.pagination.realPage,
    take: request.pagination.realTake,
  });

  return response.json(product);
});

productRouter.get('/:market_id/:product_id', async (request, response) => {
  const { market_id, product_id } = request.params;
  const { secret = false } = request.query;
  const productRepository = getRepository(MarketProducts);

  const findProduct = await productRepository.findOne({
    where: {
      market_id,
      id: product_id,
      secret,
    },
  });

  return response.json(findProduct);
});

productRouter.use(ensureAuth);

// CREATE PUBLIC PRODUCTS
productRouter.post('/', async (request, response) => {
  const {
    name,
    gtin,
    category,
    price,
    secret,
    promotion,
    quantity,
  } = request.body;

  const createProduct = new CreateProductService();

  const product = await createProduct.execute({
    name,
    gtin,
    category,
    price,
    secret,
    promotion,
    quantity,
    market_id: request.market.id,
  });

  return response.json(product);
});

productRouter.post('/import', async (request, response) => {
  const {
    name,
    gtin,
    category,
    price,
    secret,
    promotion,
    quantity,
  } = request.body;

  const createProduct = new CreateProductService();

  const product = await createProduct.execute({
    name,
    gtin,
    category,
    price,
    secret,
    promotion,
    quantity,
    market_id: request.market.id,
  });

  return response.json(product);
});

// DELETE PRODUCTS
productRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const deleteProduct = new DeleteProductService();

  await deleteProduct.execute(id);

  return res.status(204).send();
});

export default productRouter;

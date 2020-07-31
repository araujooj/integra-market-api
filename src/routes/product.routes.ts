import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import ensureAuth from '../middlewares/ensureAuth';
import usePagination from '../middlewares/usePagination';
import CreateProductService from '../services/Products/CreateProductService';
import DeleteProductService from '../services/Products/DeleteProductService';
import { getCustomRepository, getRepository } from 'typeorm';
import ProductRepository from '../repositories/productRepository';
import MarketProducts from '../models/MarketProducts';

const upload = multer(uploadConfig);
const productRouter = Router();

productRouter.get('/:market_id', async (request, response) => {
  const { market_id } = request.params;
  const productRepository = getRepository(MarketProducts);

  const product = await productRepository.find({
    where: {
      market_id,
    },
  });

  return response.json(product);
});

productRouter.use(usePagination, ensureAuth);

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

  await createProduct.execute({
    name,
    gtin,
    category,
    price,
    secret,
    promotion,
    quantity,
    market_id: request.market.id,
  });

  return response.status(204).send();
});

// DELETE PRODUCTS
productRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const deleteProduct = new DeleteProductService();

  await deleteProduct.execute(id);

  return res.status(204).send();
});

export default productRouter;

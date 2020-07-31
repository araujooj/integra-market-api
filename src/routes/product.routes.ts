import { Router } from 'express';
import multer from 'multer';
import { getCustomRepository } from 'typeorm';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';
import ensureAuth from '../middlewares/ensureAuth';
import usePagination from '../middlewares/usePagination';
import ProductRepository from '../repositories/productRepository';
import CreateProductService from '../services/Products/CreateProductService';
import DeleteProductService from '../services/Products/DeleteProductService';
import UpdateProductImageService from '../services/Products/UpdateProductImageService';

const upload = multer(uploadConfig);
const productRouter = Router();

productRouter.use(usePagination, ensureAuth);

// CREATE PUBLIC PRODUCTS
productRouter.post('/create', async (request, response) => {
  const { name, price, promotion, category, quantity, unit } = request.body;

  const createProduct = new CreateProductService();

  const product = await createProduct.execute({
    name,
    price,
    promotion,
    category,
    secret: false,
    market_id: request.market.id,
    quantity,
    unit,
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

import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import ensureAuth from '../middlewares/ensureAuth';
import ProductRepository from '../repositories/productRepository';
import CreatePublicProductService from '../services/Products/CreatePublicProductService';
import CreatePrivateProductService from '../services/Products/CreatePrivateProductService';
import usePagination from '../middlewares/usePagination';
import UpdateProductImageService from '../services/Products/UpdateProductImageService';
import UpdateProductService from '../services/Products/UpdateProductService';
import AppError from '../errors/AppError';
import uploadConfig from '../config/upload';
import DeleteProductService from '../services/Products/DeleteProductService';

const upload = multer(uploadConfig);
const productRouter = Router();

productRouter.use(usePagination);

// FIND BY MARKET
productRouter.get('/public/:marketId', async (request, response) => {
  const { marketId } = request.params;
  const productRepository = getCustomRepository(ProductRepository);

  const products = await productRepository.find({
    where: {
      market: marketId,
      secret: false,
    },
    skip: request.pagination.realPage,
    take: request.pagination.realTake,
  });

  return response.json(products);
});

// FIND PRODUCTS ON MARKET
productRouter.get('/public/:marketId/:product', async (request, response) => {
  const { marketId, product } = request.params;
  const productRepository = getCustomRepository(ProductRepository);

  const products = await productRepository.findByProduct({
    market_id: marketId,
    product,
    skip: request.pagination.realPage,
    take: request.pagination.realTake,
  });

  return response.json(products);
});

// FIND SPECIFIC PRODUCT ON MARKET
productRouter.get('/public/:marketId/:productId', async (request, response) => {
  const { marketId, productId } = request.params;
  const productRepository = getCustomRepository(ProductRepository);

  const product = await productRepository.findOne({
    where: {
      market: marketId,
      secret: false,
      id: productId,
    },
  });

  if (!product) {
    throw new AppError('Product not found, please inform a real product', 401);
  }

  return response.json(product);
});

productRouter.use(ensureAuth);

// FIND AND DECRYPT PRODUCTS
productRouter.get('/private', async (request, response) => {
  const productRepository = getCustomRepository(ProductRepository);
  const market_id = request.market.id;
  const products = await productRepository.findAndDecrypt({
    market_id,
    skip: request.pagination.realPage,
    take: request.pagination.realTake,
  });

  return response.json(products);
});

// CREATE AND ENCRYPT PRODUCTS
productRouter.post('/create/private', async (request, response) => {
  const { name, price, promotion, category, quantity, unit } = request.body;

  const createProduct = new CreatePrivateProductService();

  const product = await createProduct.execute({
    name,
    price,
    promotion,
    category,
    secret: true,
    market_id: request.market.id,
    quantity,
    unit,
  });

  return response.json(product);
});

// CREATE PUBLIC PRODUCTS
productRouter.post('/create/public', async (request, response) => {
  const { name, price, promotion, category, quantity, unit } = request.body;

  const createProduct = new CreatePublicProductService();

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

// ADD IMAGE ON PRODUCT
productRouter.patch(
  '/image/:product_id',
  upload.single('image'),
  async (request, response) => {
    const { product_id } = request.params;
    const updateImage = new UpdateProductImageService();

    const market = await updateImage.execute({
      product_id,
      imageFilename: request.file.filename,
    });

    return response.json(market);
  },
);

// * TODO -  Fix this endpoint
productRouter.put('/change/:product_id', async (request, response) => {
  const { name, price, promotion, category, secret } = request.body;
  const { product_id } = request.params;

  const updateProduct = new UpdateProductService();

  const product = await updateProduct.execute({
    name,
    product_id,
    price,
    promotion,
    category,
    secret,
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

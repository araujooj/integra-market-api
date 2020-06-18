import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import Category from '../models/Category';
import CategoryRepository from '../repositories/categoryRepository';
import usePagination from '../middlewares/usePagination';
import ensureAuth from '../middlewares/ensureAuth';

const categoryRouter = Router();

categoryRouter.use(usePagination);

categoryRouter.get('/public', async (request, response) => {
  const categoryRepository = getRepository(Category);

  const category = await categoryRepository.find({
    where: {
      secret: false,
    },
  });

  return response.json(category);
});

categoryRouter.use(ensureAuth);

categoryRouter.get('/secret', async (request, response) => {
  const categoryRepository = getCustomRepository(CategoryRepository);

  const category = await categoryRepository.findAndDecrypt({
    market_id: request.market.id,
    take: request.pagination.realTake,
    skip: request.pagination.realPage,
  });

  return response.json(category);
});

categoryRouter.post('/', async (request, response) => {
  return response.send();
});

export default categoryRouter;

import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CategoryRepository from '../repositories/categoryRepository';
import usePagination from '../middlewares/usePagination';
import ensureAuth from '../middlewares/ensureAuth';

const categoryRouter = Router();

categoryRouter.use(usePagination);

categoryRouter.get('/public/:marketId', async (request, response) => {
  const { marketId } = request.params;
  const categoryRepository = getCustomRepository(CategoryRepository);

  const category = await categoryRepository.find({
    where: {
      secret: false,
      market: marketId,
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

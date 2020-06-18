import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateMarketService from '../services/Market/CreateMarketService';
import UpdateMarketAvatarService from '../services/Market/UpdateMarketAvatarService';
import ensureAuth from '../middlewares/ensureAuth';
import MarketRepository from '../repositories/marketRepository';
import usePagination from '../middlewares/usePagination';

const marketRouter = Router();
const upload = multer(uploadConfig);
marketRouter.use(usePagination);

marketRouter.get('/', async (request, response) => {
  const marketRepository = getCustomRepository(MarketRepository);

  const market = await marketRepository.find();

  market.forEach(marketItem => delete marketItem.password);

  return response.json(market);
});

marketRouter.get('/:city', async (request, response) => {
  const { city } = request.params;
  const marketRepository = getCustomRepository(MarketRepository);

  const market = await marketRepository.findByCity({
    city,
    skip: request.pagination.realPage,
    take: request.pagination.realTake,
  });

  market.forEach(marketItem => delete marketItem.password);

  return response.json(market);
});

marketRouter.post('/', async (request, response) => {
  const { name, email, password, city } = request.body;

  const createMarket = new CreateMarketService();

  const market = await createMarket.execute({
    name,
    email,
    password,
    city,
  });

  delete market.password;

  return response.json(market);
});

marketRouter.use(ensureAuth);

marketRouter.patch(
  '/avatar',
  upload.single('avatar'),
  async (request, response) => {
    const updateMarket = new UpdateMarketAvatarService();

    const market = await updateMarket.execute({
      market_id: request.market.id,
      avatarFilename: request.file.filename,
    });

    delete market.password;

    return response.json(market);
  },
);

export default marketRouter;

import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateMarketService from '../services/Market/CreateMarketService';
import UpdateMarketAvatarService from '../services/Market/UpdateMarketAvatarService';
import ensureAuth from '../middlewares/ensureAuth';
import Market from '../models/Market';


const marketRouter = Router();
const upload = multer(uploadConfig);

marketRouter.get('/', async (request, response) => {
    const marketRepository = getRepository(Market);

    const market = await marketRepository.find()

    market.forEach(marketItem => delete marketItem.password)

    return response.json(market)
})

marketRouter.use(ensureAuth)

marketRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createMarket = new CreateMarketService();

    const market = await createMarket.execute({
        name,
        email,
        password,
    });

    delete market.password;

    return response.json(market);
});

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
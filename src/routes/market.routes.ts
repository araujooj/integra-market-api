import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateMarketService from '../services/Market/CreateMarketService';
import UpdateMarketAvatarService from '../services/Market/UpdateMarketAvatarService';
import ensureAuth from '../middlewares/ensureAuth';

const marketRouter = Router();
const upload = multer(uploadConfig);

marketRouter.use(ensureAuth)

marketRouter.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    const createMarket = new CreateMarketService();

    const market = await createMarket.execute({
        name,
        email,
        password,
    });

    delete market.password;

    return res.json(market);
});

marketRouter.patch(
    '/avatar',
    upload.single('avatar'),
    async (req, res) => {
        const updateMarket = new UpdateMarketAvatarService();

        const market = await updateMarket.execute({
            market_id: req.market.id,
            avatarFilename: req.file.filename,
        });

        delete market.password;

        return res.json(market);
    },
);

export default marketRouter;
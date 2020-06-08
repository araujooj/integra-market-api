import { Router } from 'express';
import AuthService from '../services/Sessions/AuthService';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
    const { email, password } = req.body;

    const authMarket = new AuthService();

    const { market, token } = await authMarket.execute({
        email, password,
    });

    delete market.password;

    return res.json({ market, token });
});

export default sessionRouter;
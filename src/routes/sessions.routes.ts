import { Router } from 'express';
import AuthService from '../services/Sessions/AuthService';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
    const { email, password } = req.body;

    const authUser = new AuthService();

    const { user, token } = await authUser.execute({
        email, password,
    });

    delete user.password;

    return res.json({ user, token });
});

export default sessionRouter;
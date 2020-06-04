import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuth from '../middlewares/ensureAuth';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
        name,
        email,
        password,
    });

    delete user.password;

    return res.json(user);
});

userRouter.patch(
    '/avatar',
    ensureAuth,
    upload.single('avatar'),
    async (req, res) => {
        const updateUserAvatar = new UpdateUserAvatarService();

        const user = await updateUserAvatar.execute({
            user_id: req.user.id,
            avatarFilename: req.file.filename,
        });

        delete user.password;

        return res.json(user);
    },
);

export default userRouter;
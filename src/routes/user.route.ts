import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { verifyToken } from '../middlewares/authToken.midd';

const userController = new UserController();

const router = Router();

router.post('/create', userController.createUser);
router.post('/login', userController.login);
router.post('/update', verifyToken ,userController.update);

export default router;
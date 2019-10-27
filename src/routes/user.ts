import { Router } from 'express';
import UserController from '../controllers/user.controller';

const userController = new UserController();

const router = Router();

router.post('/create', userController.createUser);
router.post('/login', userController.login)

export default router;
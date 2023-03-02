import { Request, Response, Router } from 'express';

import UserController from '../controllers/LoginController';
import LoginService from '../services/LoginService';

const loginRoutes = Router();

const userService = new LoginService();
const userController = new UserController(userService);

loginRoutes.post('/', (req: Request, res: Response) => userController.authenticateLogin(req, res));

export default loginRoutes;

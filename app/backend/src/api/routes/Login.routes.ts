import { Request, Response, Router } from 'express';

import UserController from '../controllers/LoginController';
import loginField from '../Middlewares/loginFields';
import tokenCheck from '../Middlewares/tokenCheck';

const loginRoutes = Router();

const userController = new UserController();

loginRoutes.post(
  '/',
  loginField,
  (req: Request, res: Response) => userController.authenticateLogin(req, res),
);

loginRoutes.get('/role', tokenCheck, (req: Request, res: Response) =>
  userController.getUserRole(req, res));

export default loginRoutes;

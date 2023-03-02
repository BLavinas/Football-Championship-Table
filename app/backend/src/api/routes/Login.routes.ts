import { Request, Response, Router } from 'express';

import UserController from '../controllers/LoginController';
import loginField from '../Middlewares/loginFields';

const loginRoutes = Router();

const userController = new UserController();

loginRoutes.post(
  '/',
  loginField,
  (req: Request, res: Response) => userController.authenticateLogin(req, res),
);

export default loginRoutes;

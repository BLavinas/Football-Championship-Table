import { Request, Response, Router } from 'express';
import MatchControler from '../controllers/MatchController';
import tokenCheck from '../Middlewares/tokenCheck';

const matchRoutes = Router();

const matchController = new MatchControler();

matchRoutes.get('/', (req: Request, res: Response) => matchController.readAll(req, res));
matchRoutes.patch(
  '/:id/finish',
  tokenCheck,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);
matchRoutes.patch(
  '/:id',
  tokenCheck,
  (req: Request, res: Response) => matchController.updateMatchGoals(req, res),
);

export default matchRoutes;

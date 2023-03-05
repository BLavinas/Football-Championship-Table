import { Request, Response, Router } from 'express';
import MatchControler from '../controllers/MatchController';

const matchRoutes = Router();

const matchController = new MatchControler();

matchRoutes.get('/', (req: Request, res: Response) => matchController.readAll(req, res));

export default matchRoutes;

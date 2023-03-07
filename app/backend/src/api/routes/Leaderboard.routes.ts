import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRoutes = Router();

const leaderboardController = new LeaderboardController();

leaderboardRoutes.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getTeamsPerformance(req, res),
);

export default leaderboardRoutes;

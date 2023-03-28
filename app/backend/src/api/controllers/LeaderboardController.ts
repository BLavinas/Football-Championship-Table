import { Request, Response } from 'express';
import ILeaderboardService from '../interfaces/ILeaderboardService';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  private _leaderboardService: ILeaderboardService;

  constructor(leaderboardService: ILeaderboardService = new LeaderboardService()) {
    this._leaderboardService = leaderboardService;
  }

  async getTeamsPerformance(req: Request, res: Response) {
    const homeOrAway = req.path;
    const finishedMatches = await this._leaderboardService.getTeamsPerfomance(
      homeOrAway,
    );
    res.status(200).json(finishedMatches);
  }
}

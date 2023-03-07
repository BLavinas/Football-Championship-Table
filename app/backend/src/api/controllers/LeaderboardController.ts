import { Request, Response } from 'express';
import ILeaderboardService from '../interfaces/ILeaderboardService';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  private _leaderboardService: ILeaderboardService;

  constructor(leaderboardService: ILeaderboardService = new LeaderboardService()) {
    this._leaderboardService = leaderboardService;
  }

  async getTeamsPerformance(_req: Request, res: Response) {
    const finishedMatches = await this._leaderboardService.getTeamsPerfomance();
    res.status(200).json(finishedMatches);
  }
}

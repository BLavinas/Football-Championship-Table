import { Request, Response } from 'express';
import IServiceMatches from '../interfaces/IServiceMatches';
import MatchService from '../services/MatchesService';

export default class MatchControler {
  private _matchService: IServiceMatches;

  constructor(matchService: IServiceMatches = new MatchService()) {
    this._matchService = matchService;
  }

  async readAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    if (inProgress) {
      const queryInProgress: boolean = inProgress === 'true';
      const matchesByProgress = await this._matchService.readAll(
        queryInProgress,
      );
      return res.status(200).json(matchesByProgress);
    }
    const matches = await this._matchService.readAll();
    return res.status(200).json(matches);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const finishingMatch = await this._matchService.finishMatch(id);
    res.status(200).json(finishingMatch);
  }

  async updateMatchGoals(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const updateMatch = await this._matchService.updateMatchGoals(id, homeTeamGoals, awayTeamGoals);
    res.status(200).json(updateMatch);
  }

  async createMatch(req: Request, res: Response) {
    const { body } = req;
    const creatingMatch = await this._matchService.createMatch(body);
    res.status(201).json(creatingMatch);
  }
}

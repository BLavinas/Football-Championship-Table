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
}

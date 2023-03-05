import { Request, Response } from 'express';
import IServiceMatches from '../interfaces/IServiceMatches';
import MatchService from '../services/MatchesService';

export default class MatchControler {
  private _matchService: IServiceMatches;

  constructor(matchService: IServiceMatches = new MatchService()) {
    this._matchService = matchService;
  }

  async readAll(_req: Request, res: Response): Promise<void> {
    const matches = await this._matchService.readAll(_req, res);
    res.status(200).json(matches);
  }
}

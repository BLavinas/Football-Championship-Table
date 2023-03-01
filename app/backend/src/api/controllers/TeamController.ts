import { Request, Response } from 'express';
import IServiceTeams from '../interfaces/IServiceTeams';

export default class TeamController {
  private _teamService: IServiceTeams;

  constructor(teamService: IServiceTeams) {
    this._teamService = teamService;
  }

  async readAll(_req: Request, res: Response): Promise<void> {
    const result = await this._teamService.readAll(_req, res);
    res.status(200).json(result);
  }
}

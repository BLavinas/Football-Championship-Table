import { Request, Response } from 'express';
import Matches from '../../database/models/MatchModel';

export default interface IServiceMatches {
  readAll(req: Request, res: Response): Promise<Matches[]>
}

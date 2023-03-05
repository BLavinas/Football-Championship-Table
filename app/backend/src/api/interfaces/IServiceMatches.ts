// import { Request, Response } from 'express';
import Matches from '../../database/models/MatchModel';

export default interface IServiceMatches {
  readAll(queryInProgress?: boolean): Promise<Matches[]>;
  finishMatch(id: string): Promise<object>;
  updateMatchGoals(
    id: string,
    homeGoals: number,
    awayGoals: number
  ): Promise<object>;
}

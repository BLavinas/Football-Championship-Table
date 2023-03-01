import { Request, Response } from 'express';
import Teams from '../../database/models/TeamModel';

export default interface IServiceTeams {
  readAll(req: Request, res: Response): Promise<Teams[]>;
  readById(id: string): Promise<Teams | null>
}

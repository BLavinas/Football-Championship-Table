import { ModelStatic } from 'sequelize';
import Teams from '../../database/models/TeamModel';
import Matches from '../../database/models/MatchModel';
import IServiceMatches from '../interfaces/IServiceMatches';

export default class MatchService implements IServiceMatches {
  protected model: ModelStatic<Matches> = Matches;
  async readAll(): Promise<Matches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Teams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return matches;
  }
}

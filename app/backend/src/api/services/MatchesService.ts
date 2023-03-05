import { ModelStatic } from 'sequelize';
import Teams from '../../database/models/TeamModel';
import Matches from '../../database/models/MatchModel';
import IServiceMatches from '../interfaces/IServiceMatches';

export default class MatchService implements IServiceMatches {
  protected model: ModelStatic<Matches> = Matches;

  async readAll(queryProgress?: boolean | undefined): Promise<Matches[]> {
    if (queryProgress === undefined) {
      const matches = await this.model.findAll({
        include: [
          { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
          { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
        ],
      });
      return matches;
    }
    const matchesByProgress = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: { inProgress: queryProgress },
    });
    return matchesByProgress;
  }

  async finishMatch(id: string): Promise<object> {
    const finishingMatch: number[] = await this.model
      .update({ inProgress: false }, { where: { id } });
    if (finishingMatch[0] === 1) return { message: 'Finished' };
    return { message: 'cant finish the match' };
  }
}

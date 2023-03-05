import { ModelStatic } from 'sequelize';
import Teams from '../../database/models/TeamModel';
import Matches from '../../database/models/MatchModel';
import IServiceMatches from '../interfaces/IServiceMatches';
import IMatches from '../interfaces/IMatches';
import CustomErrors from '../errors/customErrors';
import ICreateMatch from '../interfaces/ICreateMatch';

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

  async updateMatchGoals(id: string, homeGoals: number, awayGoals: number): Promise<object> {
    const updateGoals = await this.model.update(
      { homeTeamGoals: homeGoals, awayTeamGoals: awayGoals },
      { where: { id } },
    );
    if (updateGoals[0] === 1) return { message: 'match updated successfully' };
    return { message: 'cannot update match' };
  }

  async createMatch(body: ICreateMatch): Promise<IMatches> {
    const { homeTeamId, awayTeamId } = body;
    const homeTeam = await this.model.findByPk(homeTeamId);
    const awayTeam = await this.model.findByPk(awayTeamId);
    if (!homeTeam || !awayTeam) {
      throw new CustomErrors('There is no team with such id!', '404');
    }
    if (homeTeamId === awayTeamId) {
      throw new CustomErrors(
        'It is not possible to create a match with two equal teams',
        '422',
      );
    }
    const creatingMatch = await this.model.create({ ...body });
    return creatingMatch.dataValues;
  }
}

import { ModelStatic } from 'sequelize';
import Matches from '../../database/models/MatchModel';
import Teams from '../../database/models/TeamModel';
import ILeaderboardService from '../interfaces/ILeaderboardService';
import totalDraws from '../Utils/TotalDraws';
import totalFavorGoals from '../Utils/TotalFavorGoals';
import totalHomeGames from '../Utils/TotalHomeGames';
import totalLosses from '../Utils/TotalLosses';
import totalOwnGoals from '../Utils/TotalOwnGoals';
import totalVictories from '../Utils/TotalVictories';
// import totalVictories from '../Utils/TotalVictories';

export default class LeaderboardService implements ILeaderboardService {
  protected modelTeams: ModelStatic<Teams> = Teams;
  protected modelMatches: ModelStatic<Matches> = Matches;

  async getTeamsPerfomance(): Promise<object> {
    const finishedMatches = await this.modelMatches.findAll({
      where: { inProgress: false },
    });

    const allTeams = await this.modelTeams.findAll();
    const leaderBoard = allTeams.map((team) => ({
      name: team.teamName,
      totalGames: totalHomeGames(team.id, finishedMatches),
      totalVictories: totalVictories(team.id, finishedMatches),
      totalDraws: totalDraws(team.id, finishedMatches),
      totalLosses: totalLosses(team.id, finishedMatches),
      goalsFavor: totalFavorGoals(team.id, finishedMatches),
      goalsOwn: totalOwnGoals(team.id, finishedMatches),
      totalPoints:
        totalVictories(team.id, finishedMatches) * 3
        + totalDraws(team.id, finishedMatches),
    }));
    return leaderBoard;
  }
}

// ver por id quantas patidas time jogou em casa
// cada objeto dentro de times tem nome e id do time
// usar array de partidas para ver quantas partidas o time jogou... etc..
// fazer uma função para cada chave do objeto que será criado no map de allTeams
// na mesma função fazer total de vitorias dentro e fora de casa

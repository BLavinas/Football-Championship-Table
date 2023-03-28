import { ModelStatic } from 'sequelize';
import Matches from '../../database/models/MatchModel';
import Teams from '../../database/models/TeamModel';
import ILeaderboard from '../interfaces/ILeaderBoard';
import ILeaderboardService from '../interfaces/ILeaderboardService';
import IMatches from '../interfaces/IMatches';
import ITeams from '../interfaces/ITeams';
import totalDraws from '../Utils/TotalDraws';
import totalFavorGoals from '../Utils/TotalFavorGoals';
import totalHomeGames from '../Utils/TotalHomeGames';
import totalLosses from '../Utils/TotalLosses';
import totalOwnGoals from '../Utils/TotalOwnGoals';
import totalPoints from '../Utils/TotalPoints';
import totalVictories from '../Utils/TotalVictories';
// import totalVictories from '../Utils/TotalVictories';

export default class LeaderboardService implements ILeaderboardService {
  protected modelTeams: ModelStatic<Teams> = Teams;
  protected modelMatches: ModelStatic<Matches> = Matches;

  construtingLeaderBoard = (allTeams: ITeams[], finished: IMatches[]) => {
    const leaderBoard = allTeams.map((team) => ({
      name: team.teamName,
      totalGames: totalHomeGames(team.id, finished),
      totalVictories: totalVictories(team.id, finished),
      totalDraws: totalDraws(team.id, finished),
      totalLosses: totalLosses(team.id, finished),
      goalsFavor: totalFavorGoals(team.id, finished),
      goalsOwn: totalOwnGoals(team.id, finished),
      totalPoints: totalPoints(team.id, finished),
      goalsBalance: totalFavorGoals(team.id, finished) - totalOwnGoals(team.id, finished),
      efficiency: ((totalPoints(team.id, finished)
       / (totalHomeGames(team.id, finished) * 3)) * 100)
        .toFixed(2),
    }));
    return this.orderLeaderBoard(leaderBoard);
  };

  orderLeaderBoard = (leaderBoard: ILeaderboard[]) => leaderBoard.sort((a, b) =>
    Number(b.totalPoints - a.totalPoints)
    || Number(b.totalVictories - a.totalVictories)
    || Number(b.goalsBalance - a.goalsBalance)
    || Number(b.goalsFavor - a.goalsFavor)
    || Number(a.goalsOwn - b.goalsOwn));

  async getTeamsPerfomance(): Promise<object> {
    const finishedMatches = await this.modelMatches.findAll({
      where: { inProgress: false },
    });
    const allTeams = await this.modelTeams.findAll();
    return this.construtingLeaderBoard(allTeams, finishedMatches);
  }
}

import IMatches from '../interfaces/IMatches';

const totalFavorGoals = (teamId: number, matches: IMatches[]): number => {
  let goals = 0;
  matches.forEach((match) => {
    if (teamId === match.homeTeamId) {
      goals += match.homeTeamGoals;
    }
  });
  return goals;
};

export default totalFavorGoals;

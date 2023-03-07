import IMatches from '../interfaces/IMatches';

const totalOwnGoals = (teamId: number, matches: IMatches[]): number => {
  let goals = 0;
  matches.forEach((match) => {
    if (teamId === match.homeTeamId) {
      goals += match.awayTeamGoals;
    }
  });
  return goals;
};

export default totalOwnGoals;

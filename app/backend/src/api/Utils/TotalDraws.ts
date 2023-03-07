import IMatches from '../interfaces/IMatches';

const totalDraws = (teamId: number, matches: IMatches[]) => {
  const totalTeamDraws = matches.reduce((prev: number, curr: IMatches): number => {
    if (teamId === curr.homeTeamId && curr.homeTeamGoals === curr.awayTeamGoals) {
      const draws = prev + 1;
      return draws;
    }
    return prev;
  }, 0);
  return totalTeamDraws;
};

export default totalDraws;

import IMatches from '../interfaces/IMatches';

const totalVictories = (teamId: number, matches: IMatches[]) => {
  const totalHomeVictories = matches.reduce((prev: number, curr: IMatches): number => {
    if (teamId === curr.homeTeamId && curr.homeTeamGoals > curr.awayTeamGoals) {
      const homeVic = prev + 1;
      return homeVic;
    }

    return prev;
  }, 0);
  return totalHomeVictories;
};

export default totalVictories;

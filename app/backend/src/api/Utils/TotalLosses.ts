import IMatches from '../interfaces/IMatches';

const totalLosses = (teamId: number, matches: IMatches[]) => {
  const totalTeamLosses = matches.reduce(
    (prev: number, curr: IMatches): number => {
      if (
        teamId === curr.homeTeamId
        && curr.homeTeamGoals < curr.awayTeamGoals
      ) {
        const losses = prev + 1;
        return losses;
      }
      return prev;
    },
    0,
  );
  return totalTeamLosses;
};

export default totalLosses;

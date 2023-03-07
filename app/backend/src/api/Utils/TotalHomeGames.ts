import IMatches from '../interfaces/IMatches';

const totalHomeGames = (teamId: number, matches: IMatches[]): number => {
  const homeTeamMatches = matches.filter((match) => match.homeTeamId === teamId);
  return homeTeamMatches.length;
};

export default totalHomeGames;

import IMatches from '../interfaces/IMatches';

const totalHomeGames = (teamId: number, matches: IMatches[]): number => {
  const teamMatches = matches.filter((match) => match.awayTeamId === teamId);
  return teamMatches.length;
};

export default totalHomeGames;

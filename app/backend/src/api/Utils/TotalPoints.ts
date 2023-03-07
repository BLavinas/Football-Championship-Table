import IMatches from '../interfaces/IMatches';
import totalDraws from './TotalDraws';
import totalVictories from './TotalVictories';

const totalPoints = (id: number, finishedMatches: IMatches[]) => {
  const total = totalVictories(id, finishedMatches) * 3
    + totalDraws(id, finishedMatches);
  return total;
};

export default totalPoints;

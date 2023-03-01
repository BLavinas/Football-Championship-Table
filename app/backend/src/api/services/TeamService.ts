import { ModelStatic } from 'sequelize';
import Teams from '../../database/models/TeamModel';
import IServiceTeams from '../interfaces/IServiceTeams';

export default class TeamService implements IServiceTeams {
  protected model: ModelStatic<Teams> = Teams;
  async readAll(): Promise<Teams[]> {
    const result = await this.model.findAll();
    return result;
  }

  async readById(id: string): Promise<Teams | null> {
    const result = await this.model.findByPk(id);
    return result;
  }
}

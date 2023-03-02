import { ModelStatic } from 'sequelize';
import Users from '../../database/models/UserModel';
import IServiceUsers from '../interfaces/IServiceLogin';

export default class LoginService implements IServiceUsers {
  protected model: ModelStatic<Users> = Users;
  async authenticateLogin(email: string): Promise<Users | null> {
    return this.model.findOne({ where: { email } });
  }
}

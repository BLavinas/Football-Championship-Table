import { ModelStatic } from 'sequelize';
import Users from '../../database/models/UserModel';
import IServiceUsers from '../interfaces/IServiceLogin';
import JWTToken from '../Utils/JWT';

export default class LoginService implements IServiceUsers {
  protected model: ModelStatic<Users> = Users;
  async authenticateLogin(email: string, _password: string): Promise<string> {
    const userByEmail = this.model.findOne({ where: { email } });
    // fazer if para usuario nao cadastrado;
    const tokenClass = new JWTToken();
    return tokenClass.generateToken(userByEmail);
  }
}

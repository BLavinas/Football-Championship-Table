import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import Users from '../../database/models/UserModel';
import IServiceLogin from '../interfaces/IServiceLogin';
import authLoginSchema from '../Utils/JoiSchema';
import JWTToken from '../Utils/JWT';
import CustomErrors from '../errors/customErrors';

export default class LoginService implements IServiceLogin {
  protected model: ModelStatic<Users> = Users;
  tokenClass = new JWTToken();

  async authenticateLogin(email: string, password: string): Promise<string> {
    const userByEmail = await this.model.findOne({ where: { email } });
    const { error } = authLoginSchema.validate({ email, password });
    if (error || !userByEmail) {
      throw new CustomErrors('Invalid email or password', '401');
    }
    const userPassword = bcrypt.compareSync(password, userByEmail.password);
    if (!userPassword) {
      throw new CustomErrors('Invalid email or password', '401');
    }

    const tokenClass = new JWTToken();
    return tokenClass.generateToken({
      id: userByEmail.id,
      username: userByEmail.username,
      email: userByEmail.email,
      role: userByEmail.role,
    });
  }

  getUserRole(token: string) {
    const { data: { role } } = this.tokenClass.authenticateToken(token);
    return { role };
  }
}

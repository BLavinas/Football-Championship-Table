import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import Users from '../../database/models/UserModel';
import IServiceUsers from '../interfaces/IServiceLogin';
import authLoginSchema from '../Utils/JoiSchema';
import JWTToken from '../Utils/JWT';
import CustomErrors from '../errors/customErrors';

export default class LoginService implements IServiceUsers {
  protected model: ModelStatic<Users> = Users;

  async authenticateLogin(email: string, password: string): Promise<string> {
    const userByEmail = await this.model.findOne({ where: { email } });
    // fazer if para usuario nao cadastrado;
    const { error } = authLoginSchema.validate({ email, password });
    if (error || !userByEmail) throw new CustomErrors('Invalid email or password', '401');
    const userPassword = bcrypt.compareSync(password, userByEmail.password);
    if (!userPassword) throw new CustomErrors('Invalid email or password', '401');

    const tokenClass = new JWTToken();
    return tokenClass.generateToken({
      id: userByEmail.id,
      username: userByEmail.username,
      email: userByEmail.email,
      role: userByEmail.role,
    });
  }
}

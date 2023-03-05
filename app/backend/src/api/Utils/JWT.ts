import { Secret, verify, sign, JwtPayload } from 'jsonwebtoken';
import CustomErrors from '../errors/customErrors';

export default class JWTToken {
  private _JWT_SECRET: Secret;
  private _jwtConfig: object;

  constructor() {
    this._JWT_SECRET = process.env.JWT_SECRET || 'defaultSecret';
    this._jwtConfig = { algorithm: 'HS256', expiresIn: '7d' };
  }

  public generateToken = (payload: object | null) => sign(
    { data: payload },
    this._JWT_SECRET,
    this._jwtConfig,
  );

  public authenticateToken = (token: string) => {
    try {
      return verify(token, this._JWT_SECRET) as JwtPayload;
    } catch (err) {
      throw new CustomErrors('Token must be a valid token', '401');
    }
  };
}

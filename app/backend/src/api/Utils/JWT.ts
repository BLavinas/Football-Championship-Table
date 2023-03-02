import { Secret, verify, sign } from 'jsonwebtoken';
import mapError from './mapErrors';

export default class JWTToken {
  private _JWT_SECRET: Secret;
  private jwtConfig: object;

  constructor() {
    this._JWT_SECRET = process.env.JWT_SECRET || 'defaultSecret';
    this.jwtConfig = { algorithm: 'HS256', expiresIn: '7d' };
  }

  public generateToken = (payload: object | null) => sign(
    { data: payload },
    this._JWT_SECRET,

    this.jwtConfig,
  );

  public authenticateToken = (token: string) => {
    try {
      verify(token, this._JWT_SECRET);
    } catch (err) {
      return mapError('Expired or invalid token');
    }
  };
}

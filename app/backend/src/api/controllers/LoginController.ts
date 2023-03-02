import { Request, Response } from 'express';
import IServiceLogin from '../interfaces/IServiceLogin';
import JWTToken from '../Utils/JWT';

export default class UserController {
  private _service: IServiceLogin;
  constructor(service: IServiceLogin) {
    this._service = service;
  }

  async authenticateLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    await this._service.authenticateLogin(email);
    const tokenClass = new JWTToken();
    const token = tokenClass.generateToken(email);

    return res.status(200).json({ token });
  }
}

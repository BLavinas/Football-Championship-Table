import { Request, Response } from 'express';
import CustomErrors from '../errors/customErrors';
import IServiceLogin from '../interfaces/IServiceLogin';
import LoginService from '../services/LoginService';

export default class UserController {
  private _service: IServiceLogin;
  constructor(service: IServiceLogin = new LoginService()) {
    this._service = service;
  }

  async authenticateLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this._service.authenticateLogin(email, password);
    return res.status(200).json({ token });
  }

  getUserRole(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) throw new CustomErrors('Token not found', '401');

    const role = this._service.getUserRole(authorization);
    return res.status(200).json(role);
  }
}

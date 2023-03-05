import { NextFunction, Request, Response } from 'express';
import CustomErrors from '../errors/customErrors';
import JWTToken from '../Utils/JWT';

const tokenCheck = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomErrors('Token not found', '401');
  const jwtClass = new JWTToken();
  const validateToken = jwtClass.authenticateToken(authorization);
  if (!validateToken) throw new CustomErrors('Token must be a valid token', '401');
  next();
};

export default tokenCheck;

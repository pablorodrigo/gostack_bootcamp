import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'Token not provider' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // check if user is adm
    if (!decoded.administrator) {
      return response
        .status(401)
        .json({ error: 'You are not an administrator of this system' });
    }

    request.userId = decoded.id;

    return next();
  } catch (error) {
    return response.status(401).json({ error: 'Token invalid' });
  }
};

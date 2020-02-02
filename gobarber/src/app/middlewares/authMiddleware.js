import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (request, response, next) => {
  const authHeader = request.headers.authorization;

  // console.log(authHeader, authConfig.secret);

  if (!authHeader) {
    return response.status(401).json({ error: 'Token not provider' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    request.userId = decoded.id;

    console.log(decoded);

    return next();
  } catch (error) {
    return response.status(401).json({ error: 'Token invalid' });
  }
};

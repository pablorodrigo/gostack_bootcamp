import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class UserSessionController {
  async store(request, response) {
    // get only email and password from request
    const { email, password } = request.body;
    // try to find the user in DB
    const user = await User.findOne({ where: { email } });
    // verify if user exist or if password match
    if (!user) {
      return response.status(401).json({ error: 'User not found' });
    }
    if (!(await user.checkPassword(password))) {
      return response.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, administrator } = user;

    return response.json({
      user: {
        id,
        name,
        email,
        administrator,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new UserSessionController();

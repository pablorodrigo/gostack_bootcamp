import User from '../models/User';

class UserController {
  async store(request, response) {
    // verify if exist a user in DB
    const userExist = await User.findOne({
      where: { email: request.body.email },
    });

    if (userExist) {
      return response.status(400).json({ error: ' User already exist' });
    }

    // const user = await User.create(request.body);
    // return response.json(user);

    const { id, name, email, provider } = await User.create(request.body);

    return response.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(request, response) {
    const { email, oldPassword } = request.body;

    const user = await User.findByPk(request.userId);

    if (email && email !== user.email) {
      const userExist = await User.findOne({
        where: { email },
      });

      if (userExist) {
        return response.status(400).json({ error: ' User already exist' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return response.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, provider } = await user.update(request.body);

    // console.log(request.userId);

    // return response.json({ ok: true });

    return response.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();

import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(request, response) {
    // check fields
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

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
    // check fields
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

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

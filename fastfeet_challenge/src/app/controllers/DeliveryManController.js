import * as Yup from 'yup';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

class DeliveryManController {
  async index(request, response) {
    const deliverymen = await DeliveryMan.findAll({
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
      ],
    });

    return response.json(deliverymen);
  }

  async store(request, response) {
    // check fields
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }
    const deliveryMan = request.body;

    // verify if exist a Recipient in DB
    const deliveryManExist = await DeliveryMan.findOne({
      where: { name: deliveryMan.name },
      searchPath: 'deliverymen',
    });

    if (deliveryManExist !== null || deliveryManExist) {
      return response
        .status(400)
        .json({ error: ' DeliveryMan already exist in DB' });
    }

    await DeliveryMan.create(deliveryMan);

    return response.json({ return: 'DeliveryMan created' });
  }

  async update(request, response) {
    // check fields
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const { email, id: deliveryManId } = request.body;

    const deliveryman = await DeliveryMan.findByPk(deliveryManId);

    if (email && email !== deliveryman.email) {
      const deliveryManExist = await DeliveryMan.findOne({
        where: { email },
      });

      if (deliveryManExist) {
        return response
          .status(400)
          .json({ error: ' Delivery man already exist' });
      }
    }

    const { id, name } = await deliveryman.update(request.body);

    return response.json({ status: 'DeliveryMan updated', id, name, email });
  }

  async delete(request, response) {
    const deliveryMan = await DeliveryMan.findByPk(request.params.id);

    DeliveryMan.destroy({
      where: { id: deliveryMan.id },
    });

    return response.json({
      status: 'Delivery man deleted',
      name: deliveryMan.name,
    });
  }
}

export default new DeliveryManController();

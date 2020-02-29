import * as Yup from 'yup';
import Delivery from '../models/Delivery';

// email config
import Queue from '../lib/Queue';
import DeliveryEmail from '../jobs/DeliveryEmail';
import DeliveryMan from '../models/DeliveryMan';

class DeliveryController {
  async index(request, response) {
    return response.json({ status: 'ok' });
  }

  async store(request, response) {
    // check fields
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      deliveryman_id: Yup.number().required(),
      recipient_id: Yup.number().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }
    const delivery = request.body;

    await Delivery.create(delivery);

    const deliveryman = await DeliveryMan.findByPk(delivery.deliveryman_id);

    await Queue.add(DeliveryEmail.key, {
      deliveryman,
      product: delivery.product,
      date: new Date(),
    });

    return response.json({ status: 'Delivery created', delivery });
  }

  async update(request, response) {
    return response.json({ status: 'ok' });
  }

  async delete(request, response) {
    return response.json({ status: 'ok' });
  }
}

export default new DeliveryController();

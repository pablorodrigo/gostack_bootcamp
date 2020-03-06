import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';
import Recipient from '../models/Recipient';
import Queue from '../lib/Queue';
import DeliveryCancellationEmail from '../jobs/DeliveryCancellationEmail';
import DeliveryMan from '../models/DeliveryMan';

class DeliveryProblemController {
  async index(request, response) {
    const deliveryProblems = await DeliveryProblem.findAll({
      where: {
        delivery_id: request.params.id,
      },
      attributes: ['description'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['product'],
        },
      ],
    });

    return response.json(deliveryProblems);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const { delivery_id, description } = await DeliveryProblem.create({
      description: request.body.description,
      delivery_id: request.params.id,
    });

    const delivery = await Delivery.findOne({
      where: {
        id: delivery_id,
      },
      attributes: ['product', 'canceled_at'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'phone_contact', 'street'],
        },
      ],
    });

    return response.json({
      problem: description,
      delivery,
    });
  }

  async delete(request, response) {
    const delivery = await Delivery.findByPk(request.params.id);

    delivery.canceled_at = new Date();

    await delivery.save();

    const deliveryman = await DeliveryMan.findByPk(delivery.deliveryman_id);

    await Queue.add(DeliveryCancellationEmail.key, {
      deliveryman,
      product: delivery.product,
      date: delivery.canceled_at,
    });

    return response.json({
      status: 'delivery cancelled',
      product: delivery.product,
    });
  }
}

export default new DeliveryProblemController();

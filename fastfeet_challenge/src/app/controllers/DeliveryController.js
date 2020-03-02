import * as Yup from 'yup';
import Delivery from '../models/Delivery';

// email config
import Queue from '../lib/Queue';
import DeliveryEmail from '../jobs/DeliveryEmail';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';

class DeliveryController {
  async index(request, response) {
    const deliveries = await Delivery.findAll({
      attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at'],
      include: [
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'phone_contact', 'street'],
        },
      ],
    });

    return response.json(deliveries);
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
    // check fields
    const schema = Yup.object().shape({
      product: Yup.string(),
      deliveryman_id: Yup.number(),
      recipient_id: Yup.number(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const delivery = await Delivery.findByPk(request.params.id);

    const { product, recipient_id, deliveryman_id } = await delivery.update(
      request.body
    );

    const { name: name_recipient } = await Recipient.findByPk(recipient_id);

    const { name: name_deliveryMan } = await DeliveryMan.findByPk(
      deliveryman_id
    );

    return response.json({
      status: 'Delivery updated',
      product,
      name_recipient,
      name_deliveryMan,
    });
  }

  async delete(request, response) {
    const delivery = await Delivery.findByPk(request.params.id);

    Delivery.destroy({
      where: { id: delivery.id },
    });

    return response.json({ status: 'Delivery deleted', delivery });
  }
}

export default new DeliveryController();

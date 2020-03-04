import { Op } from 'sequelize';
import { isWithinInterval, startOfHour, setHours } from 'date-fns';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveryManDeliveriesController {
  async index(request, response) {
    // deliveries still not finished
    if (request.path.split('/')[3] !== 'deliveries') {
      const deliveries = await Delivery.findAll({
        where: {
          deliveryman_id: request.params.id,
          end_date: null,
          canceled_at: null,
        },
        attributes: ['product', 'start_date', 'end_date', 'canceled_at'],
        include: [
          {
            model: Recipient,
            as: 'recipient',
            attributes: ['name', 'phone_contact', 'street'],
          },
        ],
      });

      return response.json(deliveries);
    }
    // deliveries
    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: request.params.id,
        start_date: { [Op.ne]: null },
        end_date: { [Op.ne]: null },
        signature_id: { [Op.ne]: null },

        canceled_at: null,
      },
      attributes: ['product', 'start_date', 'end_date', 'canceled_at'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'phone_contact', 'street'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['path', 'url'],
        },
      ],
    });

    return response.json(deliveries);
  }

  async update(request, response) {
    const currentDate = new Date();

    // check if date is available
    if (
      !isWithinInterval(currentDate, {
        start: startOfHour(setHours(currentDate, 8)),
        end: startOfHour(setHours(currentDate, 18)),
      })
    ) {
      return response.status(401).json({
        warning: 'You can only delivery between 08:00h and 18:00h',
      });
    }

    const delivery = await Delivery.findByPk(request.params.id);

    const { recipient_id } = await delivery.update({
      start_date: currentDate,
    });

    const { name, phone_contact, zip_code } = await Recipient.findByPk(
      recipient_id
    );

    return response.json({
      status: 'Delivery updated',
      product: delivery.product,
      start_date: delivery.start_date,
      end_date: delivery.end_date,
      recipient: {
        name,
        phone_contact,
        zip_code,
      },
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

export default new DeliveryManDeliveriesController();

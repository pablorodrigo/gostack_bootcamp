import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

class DeliveryManDeliveriesEndController {
  async update(request, response) {
    // check fields
    const schema = Yup.object().shape({
      signature_id: Yup.number().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const currentDate = new Date();

    const delivery = await Delivery.findByPk(request.params.id);

    const { recipient_id, signature_id } = await delivery.update({
      end_date: currentDate,
      signature_id: request.body.signature_id,
    });

    const { name, phone_contact, zip_code } = await Recipient.findByPk(
      recipient_id
    );

    return response.json({
      status: 'Delivery updated',
      product: delivery.product,
      start_date: delivery.start_date,
      end_date: delivery.end_date,
      signature: signature_id,
      recipient: {
        name,
        phone_contact,
        zip_code,
      },
    });
  }
}

export default new DeliveryManDeliveriesEndController();

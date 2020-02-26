import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(request, response) {
    // const recipient = request.body;

    // check fields
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      phone_contact: Yup.string().required(),
      zip_code: Yup.string().required(),
      state: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }
    const recipient = request.body;

    // verify if exist a Recipient in DB
    const recipientExist = await Recipient.findOne({
      where: { name: recipient.name },
    });

    if (recipientExist) {
      return response.status(400).json({ error: ' Recipient already exist' });
    }

    await Recipient.create(recipient);

    return response.json({ return: 'Recipient created' });
  }

  // not used yet
  async update(request, response) {
    // check fields

    return response.json({ return: 'Recipient updated' });
  }
}

export default new RecipientController();

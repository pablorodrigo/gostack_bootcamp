/**
 * Called when new delivery is created
 */

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../lib/Mail';

class DeliveryEmail {
  get key() {
    return 'DeliveryEmail';
  }

  async handle({ data }) {
    const { deliveryman, product, date } = data;

    console.log('created a queue');

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Novo pedido',
      // text: 'Voce tem um novo cancelamento',
      template: 'newdelivery',
      context: {
        deliveryman_name: deliveryman.name,
        product,
        date: format(parseISO(date), "'dia' dd 'de' MMMM' às' H:mm'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new DeliveryEmail();

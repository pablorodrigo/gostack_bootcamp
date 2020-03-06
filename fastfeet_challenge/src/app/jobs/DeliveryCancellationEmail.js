/**
 * Called when new delivery is created
 */

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../lib/Mail';

class DeliveryCancellationEmail {
  get key() {
    return 'DeliveryCancellationEmail';
  }

  async handle({ data }) {
    const { deliveryman, product, date } = data;

    console.log('created a queue - DeliveryCancellationEmail');

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Entrega cancelada',
      template: 'delivery_cancelled',
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

export default new DeliveryCancellationEmail();

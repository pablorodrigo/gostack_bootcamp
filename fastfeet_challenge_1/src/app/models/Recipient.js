import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  // fields possible to register
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        phone_contact: Sequelize.STRING,
        zip_code: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
        complement: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Recipient;

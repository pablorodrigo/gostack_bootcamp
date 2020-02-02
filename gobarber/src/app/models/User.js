import Sequelize, {Model} from 'sequelize';

// crypy password
import bcrypt from 'bcryptjs';

class User extends Model {
  // fi lds possible to register
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // virtual because it does not exist in DB
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    // blocks of code witch run automatically
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // methods
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;

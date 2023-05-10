const { User } = require('../models');

class LoginService {
  static async getByUserEmail(email) {
    const user = await User.findOne({
      where: { email },
    });

    return user;
  }
}

module.exports = LoginService;
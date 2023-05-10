const { User } = require('../models');

class UserService {
  static async getByUserEmail(email) {
    const user = await User.findOne({
      where: { email },
    });

    return user;
  }
}

module.exports = UserService;
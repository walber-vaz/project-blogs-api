const { User } = require('../models');
const generateToken = require('../utils/generationToken');
const userValidation = require('./validations/userValidation');

class UserService {
  static async createUser(newUser) {
    const isUser = userValidation(newUser);
    if (isUser) return { type: isUser.type, message: isUser.message };

    const { password: _, ...userWithoutPassword } = newUser;
    const token = generateToken(userWithoutPassword);

    await User.create(newUser);

    return { type: 201, message: { token } };
  }
}

module.exports = UserService;
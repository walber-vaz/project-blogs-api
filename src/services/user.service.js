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

  static async findAllUsers() {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    return { type: 200, message: users };
  }

  static async findUserById(id) {
    const [user] = await User.findAll({
      where: { id },
      attributes: { exclude: ['password'] },
    });

    if (!user) return { type: 404, message: { message: 'User does not exist' } };

    return { type: 200, message: user };
  }

  static async deleteUser(id) {
    await User.destroy({ where: { id } });

    return { type: 204, message: '' };
  }
}

module.exports = UserService;
const { userService, loginService } = require('../services');

class UserController {
  static async create(req, res) {
    const emailUser = await loginService.getByUserEmail(req.body.email);
    
    if (emailUser) return res.status(409).json({ message: 'User already registered' });

    const { message, type } = await userService.createUser(req.body);

    return res.status(type).json(message);
  }

  static async getAll(req, res) {
    const { message, type } = await userService.findAllUsers();

    return res.status(type).json(message);
  }
}

module.exports = UserController;
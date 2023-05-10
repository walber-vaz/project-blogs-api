const { loginService } = require('../services');
const generationToken = require('../utils/generationToken');

class LoginController {
  static async login(req, res) {
    const { email, password } = req.body;
    const user = await loginService.getByUserEmail(email);

    if (!email && !password) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const token = generationToken(user);

    return res.status(200).json({ token });
  }
}

module.exports = LoginController;
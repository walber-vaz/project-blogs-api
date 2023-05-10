const { Router } = require('express');
const { loginController } = require('../controllers');

class LoginRouter {
  constructor() {
    this.router = Router();

    this.router.post('/', loginController.login);
  }
}

module.exports = new LoginRouter().router;
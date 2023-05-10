const { Router } = require('express');
const { userController } = require('../controllers');

class UserRoute {
  constructor() {
    this.router = Router();

    this.router.post('/', userController.create);
  }
}

module.exports = new UserRoute().router;
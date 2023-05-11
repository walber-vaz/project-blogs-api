const { Router } = require('express');
const { userController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');

class UserRoute {
  constructor() {
    this.router = Router();

    this.router.get('/', validateToken, userController.getAll);
    this.router.get('/:id', validateToken, userController.getById);
    this.router.post('/', userController.create);
    this.router.delete('/me', validateToken, userController.delete);
  }
}

module.exports = new UserRoute().router;
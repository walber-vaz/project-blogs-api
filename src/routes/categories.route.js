const { Router } = require('express');
const { categoriesController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');

class CategoriesRoute {
  constructor() {
    this.router = Router();

    this.router.post('/', validateToken, categoriesController.createCategory);
  }
}

module.exports = new CategoriesRoute().router;
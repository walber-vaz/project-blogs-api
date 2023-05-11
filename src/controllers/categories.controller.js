const { categoriesService } = require('../services');

class CategoriesController {
  static async createCategory(req, res) {
    const { type, message } = await categoriesService.createCategory(req.body);

    return res.status(type).json(message);
  }

  static async getAllCategory(req, res) {
    const { type, message } = await categoriesService.getAllCategory();

    return res.status(type).json(message);
  }
}

module.exports = CategoriesController;
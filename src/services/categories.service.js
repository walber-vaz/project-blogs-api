const { Category } = require('../models');
const categoryValidate = require('./validations/categoryValidate');

class CategoriesService {
  static async createCategory(category) {
    const error = categoryValidate(category);
    if (error) return { type: error.type, message: error.message };

    const newCategory = await Category.create(category);

    return { type: 201, message: newCategory.dataValues };
  }
}

module.exports = CategoriesService;

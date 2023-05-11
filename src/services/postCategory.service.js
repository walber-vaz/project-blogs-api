const { PostCategory } = require('../models');

class PostCategoryService {
  static async createPostCategory(postId, categoryId) {
    await Promise.all(categoryId
      .map(async (id) => PostCategory.create({ postId, categoryId: id })));
  }
}

module.exports = PostCategoryService;
const { BlogPost } = require('../models');
const { createPostCategory } = require('./postCategory.service');
const postCategoryValidate = require('./validations/postCategoryValidate');
const postNewValidate = require('./validations/postNewValidate');

class BlogPostService {
  static async createPost(post, userId) {
    const error = await postNewValidate(post);
    if (error) return { type: error.type, message: error.message };

    const idError = await postCategoryValidate(post.categoryIds);
    if (idError) return { type: idError.type, message: idError.message };

    const newPostShema = {
      ...post,
      userId,
      published: new Date(),
      updated: new Date(),
    };

    const postCreate = await BlogPost.create(newPostShema);
    await createPostCategory(postCreate.id, post.categoryIds);

    return { type: 201, message: postCreate };
  }
}

module.exports = BlogPostService;
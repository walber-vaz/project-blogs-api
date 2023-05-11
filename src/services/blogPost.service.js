const { BlogPost, User, Category } = require('../models');
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

  static async getAllPosts() {
    const posts = await BlogPost.findAll({
      include: [
        { 
          model: User, 
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        { 
          model: Category,
          as: 'categories',
          attributes: { exclude: ['PostCategory'] },
        },
      ],
    });

    return { type: 200, message: posts };
  }
}

module.exports = BlogPostService;
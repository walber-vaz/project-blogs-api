const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../models');
const { getAllCategory } = require('./categories.service');
const { createPostCategory } = require('./postCategory.service');
const postCategoryValidate = require('./validations/postCategoryValidate');
const postNewValidate = require('./validations/postNewValidate');
const postIdValidate = require('./validations/postIdValidate');
const postEditValidate = require('./validations/postEditValidate');

class BlogPostService {
  static async createPost(post, userId) {
    const error = await postNewValidate(post);
    if (error) return { type: error.type, message: error.message };

    const allCategory = await getAllCategory();
    const idError = await postCategoryValidate(post.categoryIds, allCategory);
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

  static async getPostById(id) {
    const posts = await this.getAllPosts();

    const idError = await postIdValidate([Number(id)], posts);
    if (idError) return { type: idError.type, message: idError.message };

    const [post] = await BlogPost.findAll({
      where: { id },
      include: [
        { model: User, 
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        { model: Category,
          as: 'categories',
          attributes: { exclude: ['PostCategory'] },
        },
      ],
    });

    return { type: 200, message: post };
  }

  static async updatePost(post, id) {
    const error = postEditValidate(post);
    if (error) return { type: error.type, message: error.message };

    await BlogPost.update(post, { where: { id } });

    const postUpdated = await this.getPostById(id);

    return { type: 200, message: postUpdated.message };
  }

  static async deletePost(id) {
    await BlogPost.destroy({ where: { id } });

    return { type: 204, message: '' };
  }

  static async searchPost(query) {
    const post = await BlogPost.findAll({
      where: { [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { content: { [Op.like]: `%${query}%` } },
        ],
      },
      include: [
        { model: User, 
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        { model: Category,
          as: 'categories',
          attributes: { exclude: ['PostCategory'] },
        },
      ],
    });

    return { type: 200, message: post };
  }
}

module.exports = BlogPostService;
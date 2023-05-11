const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');
const { blogPostController } = require('../controllers');
const validateAuthorizationUpdatePost = require('../middlewares/validateAuthorizationUpdatePost');
const validateIdPost = require('../middlewares/validateIdPost');

class BlogPostRoute {
  constructor() {
    this.router = Router();

    this.router.get('/search', validateToken, blogPostController.searchPost);
    this.router.get('/', validateToken, blogPostController.getAllPosts);
    this.router.get('/:id', validateToken, blogPostController.getPostById);
    this.router.post('/', validateToken, blogPostController.createPost);
    this.router.put(
      '/:id', 
      validateToken,
      validateAuthorizationUpdatePost,
      blogPostController.updatePost,
    );
    this.router.delete(
      '/:id',
      validateToken,
      validateIdPost,
      validateAuthorizationUpdatePost,
      blogPostController.deletePost,
    );
  }
}

module.exports = new BlogPostRoute().router;
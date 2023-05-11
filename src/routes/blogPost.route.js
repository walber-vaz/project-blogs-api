const { Router } = require('express');
const validateToken = require('../middlewares/validateToken');
const { blogPostController } = require('../controllers');
const validateAuthorizationUpdatePost = require('../middlewares/validateAuthorizationUpdatePost');

class BlogPostRoute {
  constructor() {
    this.router = Router();

    this.router.get('/', validateToken, blogPostController.getAllPosts);
    this.router.get('/:id', validateToken, blogPostController.getPostById);
    this.router.post('/', validateToken, blogPostController.createPost);
    this.router.put(
      '/:id', 
      validateToken,
      validateAuthorizationUpdatePost,
      blogPostController.updatePost,
    );
  }
}

module.exports = new BlogPostRoute().router;
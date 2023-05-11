const { blogPostService } = require('../services');

class BlogPostController {
  static async createPost(req, res) {
    // console.log(req.user.payload.id);
    const userId = req.user.payload.id;
    const { type, message } = await blogPostService.createPost(req.body, userId);

    res.status(type).json(message);
  }
}

module.exports = BlogPostController;
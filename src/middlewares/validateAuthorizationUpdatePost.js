const { blogPostService } = require('../services');

const validateAuthorizationUpdatePost = async (req, res, next) => {
  const { id: user } = req.user.payload;
  const { id: post } = req.params;

  const postId = await blogPostService.getPostById(post);
  const { userId } = postId.message;

  if (Number(user) !== Number(userId)) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  return next();
};

module.exports = validateAuthorizationUpdatePost;
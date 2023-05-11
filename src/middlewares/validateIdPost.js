const { blogPostService } = require('../services');
const postIdValidate = require('../services/validations/postIdValidate');

const validateIdPost = async (req, res, next) => {
  const { id } = req.params;
  const posts = await blogPostService.getAllPosts();
  const idError = await postIdValidate([Number(id)], posts);

  if (idError) return res.status(idError.type).json(idError.message);

  return next();
};

module.exports = validateIdPost;
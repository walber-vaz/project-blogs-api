const validateAuthorizationUpdatePost = async (req, res, next) => {
  const { id: user } = req.user.payload;
  const { id } = req.params;

  if (Number(user) !== Number(id)) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  return next();
};

module.exports = validateAuthorizationUpdatePost;
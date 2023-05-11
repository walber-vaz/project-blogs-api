const { postSchema } = require('./schema');

const postNewValidate = async (post) => {
  const { error } = postSchema.validate(post);
  if (error) return { type: 400, message: { message: error.message } };
  return false;
};

module.exports = postNewValidate;
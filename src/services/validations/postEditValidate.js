const { postEditSchema } = require('./schema');

const postEditValidate = (post) => {
  const { error } = postEditSchema.validate(post);

  if (error) return { type: 400, message: { message: error.message } };

  return false;
};

module.exports = postEditValidate;
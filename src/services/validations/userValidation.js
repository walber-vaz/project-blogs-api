const { userSchema } = require('./schema');

const userValidation = (data) => {
  const { error } = userSchema.validate(data);
  if (error) return { type: 400, message: { message: error.message } };
};

module.exports = userValidation;
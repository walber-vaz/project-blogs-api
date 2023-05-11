const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

const postSchema = Joi.object({
  title: Joi.string().required().messages({ 'string.empty': 'Some required fields are missing' }),
  content: Joi.string().required().messages({ 'string.empty': 'Some required fields are missing' }),
  categoryIds: Joi.array()
    .items(Joi.number())
    .required().min(1)
    .messages({ 'string.empty': 'one or more "categoryIds" not found',
  }),
});

const postEditSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({ 'string.empty': 'Some required fields are missing' }),
  content: Joi.string()
    .required()
    .messages({ 'string.empty': 'Some required fields are missing' }),
});

module.exports = {
  userSchema,
  postSchema,
  postEditSchema,
};
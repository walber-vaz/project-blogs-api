const { getAllCategory } = require('../categories.service');

const allIds = async () => {
  const categories = await getAllCategory();

  const ids = categories.message.map((category) => category.id);

  return ids;
};

const postCategoryValidate = async (categoryIds) => {
  const ids = await allIds();

  const isValid = categoryIds
    .map((id) => ids.includes(id)).every(Boolean);

  if (!isValid) return { type: 400, message: { message: 'one or more "categoryIds" not found' } };

  return false;
};

module.exports = postCategoryValidate;
const generationIds = require('../../utils/generationIds');

const postCategoryValidate = async (categoryIds, ids) => {
  const allIds = await generationIds(ids);

  const isValid = categoryIds
    .map((id) => allIds.includes(id)).every(Boolean);

  if (!isValid) return { type: 400, message: { message: 'one or more "categoryIds" not found' } };

  return false;
};

module.exports = postCategoryValidate;
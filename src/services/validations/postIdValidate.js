const generationIds = require('../../utils/generationIds');

const postIdValidate = async (postIds, ids) => {
  const allIds = await generationIds(ids);

  const isValid = postIds
    .map((id) => allIds.includes(id)).every(Boolean);

  if (!isValid) return { type: 404, message: { message: 'Post does not exist' } };

  return false;
};

module.exports = postIdValidate;
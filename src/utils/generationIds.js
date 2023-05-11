const generationIds = async (ids) => {
  const listsIds = await ids.message.map((category) => category.id);
  return listsIds;
};

module.exports = generationIds;
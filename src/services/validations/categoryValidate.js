const categoryValidate = (data) => {
  const { name } = data;
  if (!name) return { type: 400, message: { message: '"name" is required' } };

  return false;
};

module.exports = categoryValidate;
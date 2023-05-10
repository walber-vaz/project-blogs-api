/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'post_id',
      references: {
        model: 'BlogPosts',
        key: 'id',
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'category_id',
      references: {
        model: 'Category',
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
    underscored: true,
  });

  PostCategory.associate = (models) => {
    models.Category.hasMany(models.BlogPosts, {
      as: 'categoryId',
      foreignKey: 'categoryId',
    });
    models.BlogPosts.hasMany(models.Category, {
      as: 'postId',
      foreignKey: 'postId',
    });
  };
    
  return PostCategory;
};
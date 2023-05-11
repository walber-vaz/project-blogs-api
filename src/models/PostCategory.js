/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BlogPost',
        key: 'id',
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Category',
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'posts_categories',
  });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'categoryId',
      foreignKey: 'categoryId',
      through: PostCategory,
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      foreignKey: 'categoryId',
      through: PostCategory,
      otherKey: 'categoryId',
    });
  };
    
  return PostCategory;
};
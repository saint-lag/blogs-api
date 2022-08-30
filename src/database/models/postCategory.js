const PostCategory = (sequelize, Datatypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {},
    { timestamps: false }
  );

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      as: 'categories',
      foreignKey: 'post_id',
      otherKey: 'category_id',
    });
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      as: 'blogPosts',
      foreignKey: 'category_id',
      otherKey: 'post_id',
    });
  };

  return PostCategory;
};

module.exports = PostCategory;
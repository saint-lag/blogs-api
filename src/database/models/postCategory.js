const PostCategory = (sequelize, Datatypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: {
        type: Datatypes.INTEGER,
        primaryKey: true,
      },
      categoryId: {
        type: Datatypes.INTEGER,
        primaryKey: true,
      },
    },
    { 
      tableName: 'PostCategories',
      timestamps: false 
    }
  );

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      as: 'blogPosts',
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategory;
};

module.exports = PostCategory;
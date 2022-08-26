const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User,
      {foreignKey: 'userId', as: 'users'});
  };

  return BlogPost;
};

module.exports = BlogPost;
const service = require('../services/post');

const httpStatus = require('../helpers/http.status.codes.js');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { user } = req;

  const data = await service.createPost({ title, content, categoryIds }, user);

  return res.status(httpStatus.HTTP_STATUS_CREATED).json(data);
};

const getAllPosts = async (_req, res) => {
  const data = await service.getAllPosts();

  return res.status(httpStatus.HTTP_STATUS_OK).json(data);
};

const getPostById = async (req, res) => {
  const { id } = req.params; 

  const data = await service.getPostById(id);

  if (!data) {
    return res
      .status(httpStatus.HTTP_STATUS_NOT_FOUND)
      .json({ message: 'Post does not exist' });
  }

  return res.status(httpStatus.HTTP_STATUS_OK).json(data);
};

module.exports = { createPost, getAllPosts, getPostById };

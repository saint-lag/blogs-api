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

const updatePostById = async (req, res) => {
  const { id } = req.params;

  const { data, message, status } = await service.updatePostById(
    id,
    req.body,
    req.user,
  );

  if (!data) {
    return res.status(status).json({ message });
  }

  return res.status(httpStatus.HTTP_STATUS_OK).json(data);
};

const deletePostById = async (req, res) => {
  const { id } = req.params;

  const { data, message, status } = await service.deletePostById(id, req.user);

  if (!data) {
    return res.status(status).json({ message });
  }

  return res.status(httpStatus.HTTP_STATUS_OK).json(data);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};

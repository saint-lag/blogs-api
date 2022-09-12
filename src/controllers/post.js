const service = require('../services/post');

const httpStatus = require('../helpers/http.status.codes.js');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { user } = req;

  const data = await service.createPost({ title, content, categoryIds }, user);

  return res.status(httpStatus.HTTP_STATUS_CREATED).json(data);
};

module.exports = { createPost };

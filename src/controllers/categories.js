const service = require('../services/categories');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const { code, data, message } = await service.createCategory(name);

  return res.status(code).json(data || message);
};

module.exports = { createCategory };
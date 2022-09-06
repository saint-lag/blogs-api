const service = require('../services/categories');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const { code, data, message } = await service.createCategory(name);

  return res.status(code).json(data || message);
};

const getAllCategories = async (_req, res) => {
  const { code, data } = await service.getAllCategories();
  return res.status(code).json(data);
};

module.exports = { createCategory, getAllCategories };
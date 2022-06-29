const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const results = await productsModel.getAllProducts();

  if (!results) return [];

  return results;
};

const getProductById = async (id) => {
  const results = await productsModel.getProductById(id);

  if (!results) return [];

  return results;
};

module.exports = {
  getAllProducts,
  getProductById,
};

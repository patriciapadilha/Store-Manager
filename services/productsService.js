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

const addNewProduct = async (name) => {
  if (!name) {
    return {
      error: {
        code: 400,
        message: '"name" is required',
      },
    };
  }

  if (name.length < 5) {
    return {
      error: {
        code: 422,
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  
  const result = await productsModel.addNewProduct(name);
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
};

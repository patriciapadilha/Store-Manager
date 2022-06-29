const productsService = require('../services/productsService');

const getAllProducts = async (req, res) => {
  const results = await productsService.getAllProducts();

  // if (!results) {
  //   throw new Error({ status: 400, message: 'Product not found' });
  // }
  console.log(results);
  res.status(200).json(results);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const results = await productsService.getProductById(id);
  
  if (!results || results.length < 1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(results[0]);
};

module.exports = {
  getAllProducts,
  getProductById,
};
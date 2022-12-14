const productsService = require('../services/productsService');

const getAllProducts = async (req, res) => {
  const results = await productsService.getAllProducts();

  // if (!results) {
  //   throw new Error({ status: 400, message: 'Product not found' });
  // }
  console.log(results);
  res.status(200).send(results);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const results = await productsService.getProductById(id);
  
  if (!results || results.length < 1) {
    return res.status(404).send({ message: 'Product not found' });
  }
  res.status(200).send(results[0]);
};

const addNewProduct = async (req, res) => {
    const { name } = req.body;
    const result = await productsService.addNewProduct(name);
  
    if (result.error) {
      return res.status(result.error.code).json({ message: result.error.message });
    }
    res.status(201).send(result); 
};

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const result = await productsService.updateProduct(id, name);

  if (result.error) {
    return res.status(result.error.code).json({ message: result.error.message });
  }
  res.status(200).send(result);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const result = await productsService.deleteProduct(id);

  if (result.error) {
    return res.status(result.error.code).json({ message: result.error.message });
  }
  res.status(204).json(result);
};

const searchProduct = async (req, res) => {
  const { q } = req.query;

  const result = await productsService.searchProduct(q);

  res.status(200).json(result);
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
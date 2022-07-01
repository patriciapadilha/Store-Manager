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
    const { name, test } = req.body;
    const result = await productsService.addNewProduct(name, test);
  
    if (!result) {
      return res.status(400).send('Dados inváalidos');
    }
    res.status(201).send(result); 
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
};
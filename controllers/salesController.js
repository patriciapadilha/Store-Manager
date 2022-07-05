const salesService = require('../services/salesService');

const addSaleProduct = async (req, res) => {
  const newSales = req.body;

  const result = await salesService.addSaleProduct(newSales);

  if (result.error) {
    return res.status(result.error.code).json({ message: result.error.message });
  }

  res.status(201).json(result); 
};

module.exports = {
  addSaleProduct,
};
const salesService = require('../services/salesService');

const addSaleProduct = async (req, res) => {
  const newSales = req.body;

  const result = await salesService.addSaleProduct(newSales);

  if (result.error) {
    return res.status(result.error.code).json({ message: result.error.message });
  }

  res.status(201).json(result); 
};

const getAllSales = async (_req, res) => {
  const results = await salesService.getAllSales();

  if (!results) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  res.status(200).json(results);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.getSaleById(id);

  if (!result || result.length < 1) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  res.status(200).json(result);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const result = await salesService.deleteSale(id);

  if (result.error) {
    return res.status(result.error.code).json({ message: result.error.message });
  }
  res.status(204).json(result);
};

module.exports = {
  addSaleProduct,
  getAllSales,
  getSaleById,
  deleteSale,
};
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const validateSales = (newSales, productsList) => {
  if (newSales.some((e) => e.quantity <= 0)) {
    return {
      error: { code: 422, message: '"quantity" must be greater than or equal to 1' },
    };
  }
  if (newSales.some((e) => !e.productId)) {
    return { error: { code: 400, message: '"productId" is required' } };
  } 
  if (newSales.some((e) => !e.quantity)) {
    return { error: { code: 400, message: '"quantity" is required' } };
  }  
  if (!newSales.every((e) => productsList.some((p) => e.productId === p.id))) {
    return { error: { code: 404, message: 'Product not found' } };
  }
  return false;
};

const addSaleProduct = async (newSales) => {
  const productsList = await productsModel.getAllProducts();

  const validate = validateSales(newSales, productsList);
  if (validate) {
    return validate;
  }
  
  const id = await salesModel.addSale();
    
  await Promise.all(newSales
    .map((sale) => salesModel.addSaleProduct(id, sale.productId, sale.quantity)));
  return {
    id,
    itemsSold: newSales,
  }; 
};

const serializeGetAll = (sales) => {
  const result = (sales.map(
    ({ sale_id: saleId, date, product_id: productId, quantity }) => ({
      saleId,
      date,
      productId,
      quantity,
    }),
  ));
  return result;
};

const getAllSales = async () => {
  const results = await salesModel.getAllSales();

  if (!results) return [];

  return serializeGetAll(results);
};

const serializeGetById = (sales) => {
  const result = (sales.map(
    ({ date, product_id: productId, quantity }) => ({
      date,
      productId,
      quantity,
    }),
  ));
  return result;
};

const getSaleById = async (id) => {
  const results = await salesModel.getSaleById(id);

  if (!results) return [];

  return serializeGetById(results);
};

module.exports = {
  addSaleProduct,
  getAllSales,
  getSaleById,
};
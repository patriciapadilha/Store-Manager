const connection = require('./connection');

const addSale = async () => {
  const [row] = await connection.execute(
      'INSERT INTO sales (date) VALUES (NOW())',
    );

  return row.insertId;
};

const addSaleProduct = async (id, productId, quantity) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_Id, product_id, quantity) VALUES (?, ?, ?)',
    [id, productId, quantity],
  );

  return {
    id,
    productId,
    quantity,
  };
};

module.exports = {
  addSale,
  addSaleProduct,
};
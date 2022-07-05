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

const getAllSales = async () => {
  const [results] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity
      FROM StoreManager.sales_products AS sales_products
      RIGHT JOIN StoreManager.sales AS sales
      ON sales.id = sales_products.sale_id
      ORDER BY sale_id ASC, product_id ASC`,
  );
  return results;
};

const getSaleById = async (id) => {
  const [results] = await connection.execute(
    `SELECT date, product_id, quantity
      FROM StoreManager.sales_products AS sales_products
      RIGHT JOIN StoreManager.sales AS sales
      ON sales.id = sales_products.sale_id
      WHERE sale_id = ?
      ORDER BY sale_id, product_id`,
    [id],
  );
  return results;
};

module.exports = {
  addSale,
  addSaleProduct,
  getAllSales,
  getSaleById,
};
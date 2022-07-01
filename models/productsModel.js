const connection = require('./connection');

const getAllProducts = async () => {
  const [results] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return results;
};

const getProductById = async (id) => {
  const [results] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id =?',
    [id],
  );
  return results;
};

const addNewProduct = async (name) => {
  const [row] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  const result = {
    id: row.insertId,
    name,
  };
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
};
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

module.exports = {
  getAllProducts,
  getProductById,
};
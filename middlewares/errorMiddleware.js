const errorMiddleware = (error, _req, res) => {
  console.log('Erro', error);
  res.status(error.status || 500).json({ message: error.message || 'Tente mais tarde' });
};

module.exports = {
  errorMiddleware,
};
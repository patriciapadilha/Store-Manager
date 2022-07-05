const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

// router.get('/', productsController.getAllProducts);
router.post('/', salesController.addSaleProduct);
// router.get('/:id', productsController.getProductById);
// router.put('/:id', productsController.updateProduct);
// router.delete('/:id', productsController.deleteProduct);

module.exports = router;
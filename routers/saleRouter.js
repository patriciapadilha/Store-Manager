const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', salesController.getAllSales);
router.post('/', salesController.addSaleProduct);
router.get('/:id', salesController.getSaleById);
// router.put('/:id', productsController.updateProduct);
router.delete('/:id', salesController.deleteSale);

module.exports = router;
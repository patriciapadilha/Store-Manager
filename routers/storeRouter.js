const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.post('/', productsController.addNewProduct);
router.get('/:id', productsController.getProductById);

module.exports = router;
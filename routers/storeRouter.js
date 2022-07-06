const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/search', productsController.searchProduct);
router.get('/', productsController.getAllProducts);
router.post('/', productsController.addNewProduct);
router.get('/:id', productsController.getProductById);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
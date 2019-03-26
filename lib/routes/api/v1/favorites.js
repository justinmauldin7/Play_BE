const express = require('express');
const router = express.Router();
const favoritesController = require('../../../controllers/favorites_controller')

router.get('/', favoritesController.index);
router.get('/:id', favoritesController.show);
router.post('/', favoritesController.create);
router.put('/:id', favoritesController.put);
router.delete('/:id', favoritesController.destroy);

module.exports = router

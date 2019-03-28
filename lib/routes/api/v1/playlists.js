const express = require('express');
const router = express.Router();
const playlistsController = require('../../../controllers/playlists_controller')
const playlistsFavoritesController = require('../../../controllers/playlists_favorites_controller')

router.get('/', playlistsController.index);
router.get('/:id', playlistsController.show);
router.delete('/:playlist_id/favorites/:favorite_id', playlistsFavoritesController.destroy);
router.post('/:playlist_id/favorites/:favorite_id', playlistsFavoritesController.create);


module.exports = router

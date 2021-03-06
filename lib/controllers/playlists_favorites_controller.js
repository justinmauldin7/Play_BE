const playlist_favorite = require('../models/playlist_favorite')
const playlist = require('../models/playlist');
const favorite = require('../models/favorite');

const destroy = (request, response) => {
  playlist_favorite.destroy(request.params.playlist_id, request.params.favorite_id)
  .then(playlists_favorite => {
      response.status(200).json({"message": `Successfully removed song with id ${request.params.favorite_id} from playlist with id ${request.params.playlist_id}`})
  })
  .catch(error => {
    response.status(500).json({error});
  });
}

const create = (request, response) => {
  playlist_favorite.create(request.params.playlist_id, request.params.favorite_id)
  .then(playlists_favorite => {
      response.status(200).json({"message": `Successfully added song with id ${request.params.favorite_id} to playlist with id ${request.params.playlist_id}`})
  })
  .catch(error => {
    response.status(500).json({error});
  });
}

module.exports = {
  destroy, create
}

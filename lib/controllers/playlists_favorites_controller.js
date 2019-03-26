const playlist_favorite = require('../models/playlist_favorite')
const playlist = require('../models/playlist');
const favorite = require('../models/favorite');

const destroy = (request, response) => {
  playlist_favorite.destroy(request.params.playlist_id, request.params.favorite_id)
  .then(playlists_favorite => {
    // these vars are returning undefined
      let fav =   favorite.find(request.params.favorite_id).name
      let list =  playlist.find(request.params.playlist_id).playlist_name
      response.status(200).json({"message": `Successfully removed ${fav} from ${list}`})
  })
  .catch(error => {
    response.status(500).json({error});
  });
}

const create = (request, response) => {
  playlist_favorite.create(request.params.playlist_id, request.params.favorite_id)
}



module.exports = {
  destroy, create
}

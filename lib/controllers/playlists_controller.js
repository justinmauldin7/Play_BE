const playlist = require('../models/playlist')


const index = (request, response) => {
  playlist.all()
  .then(playlists => {
    playlists.forEach(item => {
      item.favorites.forEach(fav => {
        delete fav.created_at;
        delete fav.updated_at;
      });
    });
    response.status(200).json(playlists);
  })
  .catch((error) => {
    console.log(error);
    response.status(500).json({error});
  });
}

const show = (request, response) => {
  playlist.find(request.params.id)
  .then(playlists => {
    playlists.forEach(item => {
      item.favorites.forEach(fav => {
        delete fav.created_at;
        delete fav.updated_at;
      });
    });
    response.status(200).json(playlists);
  })
  .catch((error) => {
    console.log(error);
    response.status(500).json({error});
  });
}

module.exports = {
  index, show
}

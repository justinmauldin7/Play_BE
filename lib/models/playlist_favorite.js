const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);


const destroy = (playlist_id, favorite_id) => {
  return database('playlists_favorites')
  .where('playlist_id', playlist_id)
  .where('favorite_id', favorite_id)
  .del()
}

const create = (playlist_id, favorite_id) => {
  return database('playlists_favorites')
  .innerJoin('favorites', 'favorites.id', 'playlists_favorites.favorite_id')
  .innerJoin('playlists', 'playlists.id', 'playlists_favorites.playlist_id')
  .insert({"favorite_id": favorite_id, "playlist_id": playlist_id}, ['playlist_id', 'favorite_id'])
}


module.exports = {
  destroy, create
}

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => database('playlists')
  .select()
  .join('playlists_favorites', {'playlists.id': 'playlists_favorites.playlist_id'})
  .join('favorites', { 'favorites.id': 'playlists_favorites.favorite_id' })
  .select(['playlists.id', database.raw("JSON_AGG(favorites) as favorites")])
  .groupBy('playlists.id')

const show



module.exports ={
  all
}

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => database('playlists')
  .select()
  .join('playlists_favorites', {'playlists.id': 'playlists_favorites.playlist_id'})
  .join('favorites', { 'favorites.id': 'playlists_favorites.favorite_id' })
  .select(['playlists.id', 'playlists.playlist_name', database.raw("JSON_AGG(favorites) as favorites")])
  .groupBy('playlists.id')

const find = (id) => database('playlists')
  .select()
  .where('playlists.id', id)
  .join('playlists_favorites', {'playlists.id': 'playlists_favorites.playlist_id'})
  .join('favorites', { 'favorites.id': 'playlists_favorites.favorite_id' })
  .select(['playlists.id', 'playlists.playlist_name', database.raw("JSON_AGG(favorites) as favorites")])
  .groupBy('playlists.id')


module.exports ={
  all, find
}

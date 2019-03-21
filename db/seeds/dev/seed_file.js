exports.seed = function(knex, Promise) {
  return knex('playlists_favorites').del()
    .then(() => knex('playlists').del())
    .then(() => knex('favorites').del())
    .then(() => {
      return Promise.all([
        knex('favorites').insert([
          {name: 'Bohemian Rhapsody',artist_name: 'Queen', genre: 'Rock',rating: 88},
          {name: 'Hey Jude',artist_name: 'The Beatles', genre: 'Rock',rating: 80},
          {name: "Don't Stop Believin'",artist_name: 'Journey', genre: 'Rock',rating: 81}
        ],'id')
        .then((favorites) => {
          return knex('playlists').insert([
            {playlist_name: 'Queen of Playlists'},
            {playlist_name: 'Best Bands Ever'},
            {playlist_name: 'Journey Home Playlist'}
          ], 'id')
          .then((playlists) => {
            return knex('playlists_favorites').insert([
              {playlist_id: playlists[0], favorite_id: favorites[0]},
              {playlist_id: playlists[1], favorite_id: favorites[1]},
              {playlist_id: playlists[2], favorite_id: favorites[2]}
            ])
          })
          .catch((error) => console.log(`Error seeding playlists: ${error}`))
        })
        .catch((error) => console.log(`Error seeding favorites: ${error}`)),
      ])
    })
    .catch(error => console.log(`Error deleting playlists_favorites: ${error}`));
};

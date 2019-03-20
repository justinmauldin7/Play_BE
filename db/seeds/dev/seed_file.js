exports.seed = function(knex, Promise) {
  return knex('playlists_favorites').del()
    .then(() => knex('favorites').del())
    .then(() => knex('playlists').del())
    // Now that we have a clean slate, we can re-insert our playlists data
    .then(() => {
      return Promise.all([
        // Insert a single playlist, return the ID
        knex('playlists').insert({
          playlist_name: 'Best Classic Rock Songs'
        }, 'id')
        .then(playlist => {
          return knex('playlists_favorites').insert([
            {playlist_id: playlist[0]}
          ])
        }),
        knex('favorites').insert({
          name: 'Bohemian Rhapsody', artist_name: 'Queen', genre: 'Rock', rating: 88
        } , 'id')
        .then(favorite => {
          return knex('playlists_favorites').insert([
            {favorite_id: favorite[0], playlist_id: playlist[0]}
          ])
        })
        // .then(playlist => {
          //   return knex('playlists_favorites').insert([
            //     {playlist_id: playlist[0]}
            //   ])
            // })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};



//
//
//   .then(favorite => {
//     return (knex('favorites').insert({
//       name: 'Bohemian Rhapsody', artist_name: 'Queen', genre: 'Rock', rating: 88
//     }, 'id'))
// })
// })

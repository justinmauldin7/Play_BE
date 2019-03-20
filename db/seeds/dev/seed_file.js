exports.seed = function(knex, Promise) {
  return knex('playlists_favorites').del()
    .then(() => knex('playlists').del())
    .then(() => knex('favorites').del())
    .then(() => {
      return Promise.all([
        knex('favorites').insert([
          { name: 'Bohemian Rhapsody',artist_name: 'Queen', genre: 'Rock',rating: 88 },
          { name: 'Hey Jude',artist_name: 'The Beatles', genre: 'Rock',rating: 80 },
          { name: "Don't Stop Believin'",artist_name: 'Journey', genre: 'Rock',rating: 81 }
        ],'id')
        .then((favorites) => {
          return knex('playlists').insert([
            { playlist_name: 'Queen of Playlists' },
            { playlist_name: 'Best Bands Ever' },
            { playlist_name: 'Journey Home Playlist' }
          ], 'id')
          .then((playlists) => {
            return knex('playlists_favorites').insert([
              { playlist_id: playlists[0], favorite_id: favorites[0] },
              { playlist_id: playlists[1], favorite_id: favorites[1] },
              { playlist_id: playlists[2], favorite_id: favorites[2] }
            ])
          })
          .catch((error) => console.log(`Error seeding playlists: ${error}`))
        })
        .catch((error) => console.log(`Error seeding favorites: ${error}`)),
      ])
    })
    .catch(error => console.log(`Error deleting playlists_favorites: ${error}`));
};



// exports.seed = function(knex, Promise) {
//   return knex('playlists_favorites').del()
//     .then(() => knex('favorites').del())
//     .then(() => knex('playlists').del())
//     // Now that we have a clean slate, we can re-insert our playlists data
//     .then(() => {
//       return Promise.all([
//         // Insert a single playlist, return the ID
//         knex('playlists').insert({
//           playlist_name: 'Best Classic Rock Songs'
//         }, 'id')
//         .then(playlist => {
//           return knex('playlists_favorites').insert([
//             {playlist_id: playlist[0]}
//           ])
//         }),
//         knex('favorites').insert({
//           name: 'Bohemian Rhapsody', artist_name: 'Queen', genre: 'Rock', rating: 88
//         } , 'id')
//         .then(favorite => {
//           return knex('playlists_favorites').insert([
//             {favorite_id: favorite[0]}
//           ])
//         })
//         // .then(playlist => {
//           //   return knex('playlists_favorites').insert([
//             //     {playlist_id: playlist[0]}
//             //   ])
//             // })
//         .then(() => console.log('Seeding complete!'))
//         .catch(error => console.log(`Error seeding data: ${error}`))
//       ]) // end return Promise.all
//     })
//     .catch(error => console.log(`Error seeding data: ${error}`));
// };



//
//
//   .then(favorite => {
//     return (knex('favorites').insert({
//       name: 'Bohemian Rhapsody', artist_name: 'Queen', genre: 'Rock', rating: 88
//     }, 'id'))
// })
// })

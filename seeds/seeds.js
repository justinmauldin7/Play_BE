exports.seed = function(knex, Promise) {
  return knex('playlists').del()
    .then(() => knex('favorites').del())
    // Now that we have a clean slate, we can re-insert our playlists data
    .then(() => {
      return Promise.all([
        // Insert a single playlist, return the ID
        knex('playlists').insert({
          playlist_name: 'Best Classic Rock Songs'
        }, 'id')
        .then(knex('favorites').insert({
          name: 'Bohemian Rhapsody', artist_name: 'Queen', genre: 'Rock', rating: 88
        }, 'id'))
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};

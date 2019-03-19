exports.seed = function(knex, Promise) {
  // We must return a Promise from within our seed function
  // Without this initial `return` statement, the seed execution
  // will end before the asynchronous tasks have completed
  return knex('playlists').del()
    // Now that we have a clean slate, we can re-insert our playlists data
    .then(() => {
      return Promise.all([
        // Insert a single playlist, return the ID
        knex('playlists').insert({
          playlist_name: 'Best Classic Rock Songs'
        }, 'id')
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};

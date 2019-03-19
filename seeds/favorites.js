exports.seed = function(knex, Promise) {
  // We must return a Promise from within our seed function
  // Without this initial `return` statement, the seed execution
  // will end before the asynchronous tasks have completed
  return knex('favorites').del()
    // Now that we have a clean slate, we can re-insert our favorites data
    .then(() => {
      return Promise.all([
        // Insert a single favorite, return the ID
        knex('favorites').insert({
          name: 'Bohemian Rhapsody', artist_name: 'Queen', genre: 'Rock', rating: 88
        }, 'id')
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};

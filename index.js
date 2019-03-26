const express = require('express');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const favorites = require('./lib/routes/api/v1/favorites')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'play';

app.get('/', (request, response) => {
  response.send('Hello, Players');
});

app.use('/api/v1/favorites', favorites)

// app.get('/api/v1/playlists', (request, response) => {
//   database('playlists').select()
//   .then((playlists) => {
//     response.status(200).json(playlists)
//   })
//   .catch((error) => {
//     response.status(500).json({error})
//   });
// });
//
// // I think the below statement will work but I'm not sure how to format it in the request
// //select playlists.*, favorites.* from playlists, favorites;

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = {
  app: app,
  database: database
}

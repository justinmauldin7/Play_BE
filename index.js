const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'play';

app.get('/', (request, response) => {
  response.send('Hello, Players');
});

app.get('/api/v1/favorites', (request, response) => {
  database('favorites').select()
  .then((favorites) => {
    response.status(200).json(favorites)
  })
  .catch((error) => {
    response.status(500).json({error})
  });
});

app.get('/api/v1/favorites/:id', (request, response) => {
  database('favorites').where('id', request.params.id).select()
    .then(favorites => {
      if (favorites.length) {
        response.status(200).json(favorites);
      } else {
        response.status(404).json({
          error: `Could not find favorite with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/favorites', (request, response) => {
  const favorite = request.body;

  // for (let requiredParameter of ['name', 'artist_name', 'genre', 'rating' ]) {
  //   if (!favorite[requiredParameter]) {
  //     return response
  //       .status(422)
  //       .send({ error: `Expected format: {name: <STRING>, artist_name: <STRING>, genre: <STRING>, rating: <STRING>}. You're missing a "${requiredParameter}" property.` });
  //   }
  // }
  database('favorites').insert(favorite, 'id')
    .then(favorite => {
      response.status(201).json({ id: favorite[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});




app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

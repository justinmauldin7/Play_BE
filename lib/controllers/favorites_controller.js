const favorite = require('../models/favorite')

const index = (request, response) => {
  favorite.all()
    .then((favorites) => {
      response.status(200).json(favorites);
    })
    .catch((error) => {
      response.status(500).json({error});
    })
}

const show = (request, response) => {
  favorite.find(request.params.id)
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
}

const create = (request, response) => {
  const newFav = request.body;
  for (let requiredParameter of ["name", "artist_name", "genre", "rating"]) {
    // if (!newFav[requiredParameter]) {
    //   return response
    //   .status(422)
    //   .send({error: `Expected : { name: <string>, artist_name: <string> , genre: <string>, rating: <integer>}, You're missing a "${requiredParameter}" property`})
    // }
  }
  favorite.create(newFav)
  .then(favorite => {
    response.status(201).json({
      id: favorite[0].id
    });
  })
  .catch((error) => {
    response.status(500).send
  })
}

const put = (request, response) => {
  favorite.find(request.params.id).update({
    name: request.body.name || null,
    artist_name: request.body.artist_name || null,
    genre: request.body.genre || null,
    rating: request.body.rating || null
  })
  .then(favorite => {
    response.status(200).json({ id: request.params.id })
  })
  .catch(error => {
    response.status(500).json({ error });
  });
}

const destroy = (request, response) => {
  favorite.destroy(request.params.id)
  .then(favId => {
    if(favId) {
      response.status(204).json(favId);
    } else {
      response.status(404).json({
        error: `could not delete ${request.params.id}`
      })
    }
  }).catch(error => {
    response.status(500).json({ error })
  })
}

module.exports = {
  index, show, create, put, destroy
}

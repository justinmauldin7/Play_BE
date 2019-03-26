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

module.exports = {
  index, show, create
}

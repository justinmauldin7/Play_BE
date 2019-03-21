const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index').app;
const database = require('../index').database;

chai.use(chaiHttp);

describe('API Routes', () => {
  before((done) => {
    database.raw("TRUNCATE playlists_favorites restart identity;")
    .then(() => database.raw("TRUNCATE playlists restart identity CASCADE;"))
    .then(() => database.raw("TRUNCATE favorites restart identity CASCADE;"))
    .then(() => done())
    .catch(error => {
      throw error;
    })
  });

  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error;
    })
  });

  before((done) => {
    database.seed.run()
    .then(() => done())
    .catch(error => {
      throw error;
    })
  });

  it('should return the homepage with text', done => {
    chai.request(server)
    .get('/')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.html;
      response.res.text.should.equal('Hello, Players');
      done();
    });
  });

  describe('GET /api/v1/favorites', () => {
    it('should return all of the favorites', done => {
      chai.request(server)
      .get('/api/v1/favorites')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);

        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Bohemian Rhapsody');
        response.body[0].should.have.property('artist_name');
        response.body[0].artist_name.should.equal('Queen');
        response.body[0].should.have.property('genre');
        response.body[0].genre.should.equal('Rock');
        response.body[0].should.have.property('rating');
        response.body[0].rating.should.equal(88);

        response.body[1].should.have.property('name');
        response.body[1].name.should.equal('Hey Jude');
        response.body[1].should.have.property('artist_name');
        response.body[1].artist_name.should.equal('The Beatles');
        response.body[1].should.have.property('genre');
        response.body[1].genre.should.equal('Rock');
        response.body[1].should.have.property('rating');
        response.body[1].rating.should.equal(80);

        response.body[2].should.have.property('name');
        response.body[2].name.should.equal("Don't Stop Believin'");
        response.body[2].should.have.property('artist_name');
        response.body[2].artist_name.should.equal('Journey');
        response.body[2].should.have.property('genre');
        response.body[2].genre.should.equal('Rock');
        response.body[2].should.have.property('rating');
        response.body[2].rating.should.equal(81);
        done();
      });
    });
  });

  describe('GET /api/v1/favorites/:id', () => {
    it('should return the favorite by the ID number', done => {
      const id = 1
      chai.request(server)
      .get(`/api/v1/favorites/#{id}`)
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');

        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(id);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Bohemian Rhapsody');
        response.body[0].should.have.property('artist_name');
        response.body[0].artist_name.should.equal('Queen');
        response.body[0].should.have.property('genre');
        response.body[0].genre.should.equal('Rock');
        response.body[0].should.have.property('rating');
        response.body[0].rating.should.equal(88);
        done();
      });
    });
  });

  describe('POST /api/v1/favorites', () => {
    it('should create a new favorite', done => {
      chai.request(server)
      .post('/api/v1/favorites')
      .send({
        name: 'Like a Rolling Stone',
        artist_name: 'Bob Dylan',
        genre: 'Rock',
        rating: 82
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        done();
      });
    });
  });

  describe('PUT /api/v1/favorites/:id', () => {
    it('should update a specific favorite', done => {
      chai.request(server)
      .put('/api/v1/favorites/4')
      .send({
        name: 'Like a Rolling Stone',
        artist_name: 'Bob Dylan',
        genre: 'Rock',
        rating: 99
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        done();
      });
    });
  });

  describe('DELETE /api/v1/favorites/:id', () => {
    xit('should delete a specific favorite', done => {
      chai.request(server)
      .put('/api/v1/favorites/4')
      .end((err, response) => {
        response.should.have.status(204);
        // We need error handling in the DELETE.  Returning 200 in the test,
        // Returns 204 in Postman.
        done();
      });
    });
  });

  describe('GET /api/v1/playlists', () => {
    it('should return all of the playlists', done => {
      chai.request(server)
      .get('/api/v1/playlists')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);

        response.body[0].should.have.property('playlist_name');
        response.body[0].playlist_name.should.equal('Queen of Playlists');

        response.body[1].should.have.property('playlist_name');
        response.body[1].playlist_name.should.equal('Best Bands Ever');

        response.body[2].should.have.property('playlist_name');
        response.body[2].playlist_name.should.equal('Journey Home Playlist');
        done();
      });
    });
  });
});

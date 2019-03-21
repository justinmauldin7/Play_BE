const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index').app;
const database = require('../index').database;

chai.use(chaiHttp);

describe('Client Routes', () => {
  before((done) => {[
    database.raw("TRUNCATE playlists_favorites restart identity;")
      .then(() => database.raw("TRUNCATE playlists restart identity CASCADE;"))
      .then(() => database.raw("TRUNCATE favorites restart identity CASCADE;"))
      .catch(error => {
        throw error;
    }),
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error;
    })
  ]});

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error;
    });
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
});

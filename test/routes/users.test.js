const {
  chai,
  should,
  server,
  knex,
} = require('../setup');

describe('routes : users', () => {

  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    return knex.seed.run();
  });

  afterEach(async () => {
    return knex.migrate.rollback();
  });

  describe('GET /users', () => {
    it('should return all users', (done) => {
      chai.request(server)
        .get('/users')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.data.should.be.an('array');
          if (res.body.data.length >= 0) {
            res.body.data[0].should.include.keys(
              'id', 'username'
            );
          }
          done();
        });
    });
  });

  describe('GET users/:id', () => {
    it('should respond with a single user', (done) => {
      chai.request(server)
        .get('/users/1')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.data.should.be.an('object');
          res.body.data.should.include.keys(
            'id', 'username'
          );
          done();
        });
    });

    it('should respond with error if the user does not exist', (done) => {
      chai.request(server)
        .get('/users/10000')
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(404);
          res.body.error.should.equal('User not found');
          done();
        });
    });
  });

  describe('POST /users', () => {

    it('should return the user that was added', (done) => {
      chai.request(server)
        .post('/users')
        .send({
          username: 'Test Username',
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(201);
          res.type.should.equal('application/json');
          res.body.data.should.include.keys(
            'id', 'username'
          );
          done();
      });
    });

    it('should not accept empty username', (done) => {
      chai.request(server)
        .post('/users')
        .send({
          username: '',
        })
        .end((err, res) => {
          should.exist(err);
          should.exist(res.body.error);
          res.status.should.equal(422);
          res.type.should.equal('application/json');
          done();
        });
    });

    it('username should be unique', (done) => {
      const unique = 'Unique name';
      chai.request(server)
        .post('/users')
        .send({
          username: unique,
        })
        .then(() => {
          chai.request(server)
            .post('/users')
            .send({
              username: unique,
            })
            .end((err, res) => {
              should.exist(err);
              should.exist(res.body.error);
              res.status.should.equal(409);
              res.type.should.equal('application/json');
              done();
            });
        });
    });
  });

});




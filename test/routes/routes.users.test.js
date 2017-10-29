process.env.NODE_ENV = 'test';
const app = require('../../src/app');

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');


chai.use(chaiHttp);

const PORT = 8080;
let server;


server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

describe('routes : users', async () => {

  describe('GET /api/v1/users', () => {
    it('should return all users', async () => {
      chai.request(server)
        .get('/api/v1/users')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          if (res.body.data.length >= 0) {
            res.body.data[0].should.include.keys(
              'id', 'name', 'updatedAt', 'createdAt'
            );
          }
        });
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('should respond with a single user', async () => {
      chai.request(server)
        .get('/api/v1/users/1')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.type.should.equal('application/json');
          res.body.data.should.include.keys(
            'id', 'name', 'updatedAt', 'createdAt'
          );
        });
    });

    it('should respond with error if the user does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/users/10000')
        .end((err, res) => {
          should.exist(err);
          res.status.should.equal(404);
          res.body.error.should.equal('User not found');
          done();
        });
    });
  });

  describe('POST /api/v1/users', () => {
    it('should return the user that was added', (done) => {
      chai.request(server)
      .post('/api/v1/users')
      .send({
        name: 'Alfonso',
      })
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err);
        // there should be a 201 status code
        // (indicating that something was "created")
        res.status.should.equal(201);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"data": user object}
        res.body.data.should.include.keys(
          'id', 'name', 'createdAt', 'updatedAt'
        );
        done();
      });
    });
  });

});




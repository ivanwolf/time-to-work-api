const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const app = require('../src/app.js');
const PORT = 8080;

chai.use(chaiHttp);

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

describe('routes : index', () => {

  describe('GET /', () => {
    it('Should return Hello World', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          should.not.exist(err);
          res.body.message.should.equal('Hello World');
          done();
        });
      });
    });

});


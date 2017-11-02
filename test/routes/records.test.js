const {
  chai,
  should,
  server,
  knex,
} = require('../setup');

describe('routes : records', () => {

  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    return knex.seed.run();
  });

  afterEach(async () => {
    return knex.migrate.rollback();
  });

  describe('POST /records/fetch', () => {
    it('should return all records by user', (done) => {
      chai.request(server)
        .post('/records/fetch')
        .send({
          'user_id': 1,
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.data.should.be.an('array');
          if (res.body.data.length >= 0) {
            res.body.data[0].should.include.keys(
              'id',
              'user_id',
              'comleted',
              'date',
              'started_time',
              'finished_time',
            );
          }
          done();
        });
    });
  });
});

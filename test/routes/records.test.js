const {
  chai,
  should,
  server,
  knex,
} = require('../setup');

describe('routes : records', async () => {

  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    return knex.seed.run();
  });

  afterEach(async () => {
    return knex.migrate.rollback();
  });

  describe('GET /records', () => {
    it('should return all records by user', (done) => {
      chai.request(server)
        .get('/recors')
        .send({
          user_id: 1,
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.data.should.be.an('array');
          if (res.body.data.length >= 0) {
            res.body.data[0].should.include.keys(
              'id',
              'comleted',
              'started_at',
              'finished_at',
              'user_id',
            );
          }
          done();
        });
    });
  });
});

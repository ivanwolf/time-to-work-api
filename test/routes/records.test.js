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
          if (res.body.data.length > 0) {
            console.log(res.body.data);
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

  describe('POST /records', () => {
    it('should return the created record', (done) => {
      chai.request(server)
        .post('/records')
        .send({
          'user_id': 1,
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(201);
          res.type.should.equal('application/json');
          res.body.data.should.include.keys(
            'id',
            'user_id',
            'completed',
            'date',
            'started_time',
            'finished_time',
          );
          const record = res.body.data;
          chai.expect(record.completed).to.be.false;
          chai.expect(record.finished_time).to.be.null;
          done();
        });
    });
  });

  describe('PUT /records/:id', () => {
    it('shoudl return the updated record', (done) => {
      const createRecord = () => {
        return chai.request(server)
        .post('/records')
        .send({
          'user_id': 1,
        });
      };

      createRecord().then(res => {
        return res.body.data.id;
      }).then(id => {
        chai.request(server)
          .put(`/records/${id}`)
          .send({
            'user_id': 1,
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(200);
            res.type.should.equal('application/json');
            res.body.data.should.include.keys(
              'id',
              'user_id',
              'completed',
              'date',
              'started_time',
              'finished_time',
            );
            const record = res.body.data;
            chai.expect(record.completed).to.be.true;
            chai.expect(record.finished_time).not.to.be.null;
            done();
          });
      });
    });
  });
});

process.env.NODE_ENV = 'test';
const db = require('../../src/models');

const chai = require('chai');
const should = chai.should();

const Record = db.Record;
const User = db.Record;

const createRecord = async (obj) => Record.create(obj);
const getUser = async (id) => User.findById(id);

describe('Model: Record', () => {

  let record;
  let goodObject;

  before(async () => {
    const user = await getUser(1);
    console.log(user);
    goodObject = {
      userId: user.id,
    };
  });

  beforeEach(async () => {
    record = await createRecord(goodObject);
  });

  afterEach(async () => {
    await record.destroy();
  });

  describe('Create Record', () => {

    it ('Should have a user creator', () => {
      record.should.have.property('userId');
      record.userId.should.not.be.null;
    });

    it('Should not be completed', () => {
      record.should.have.property('completed');
      record.completed.should.be.false;
    });
  });
});


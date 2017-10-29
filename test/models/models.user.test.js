process.env.NODE_ENV = 'test';
const db = require('../../src/models');

const chai = require('chai');
const should = chai.should();
const User = db.User;

const createUser = async (obj) => User.create(obj);

describe('Model: User', () => {
  let goodUser;
  let badUser;

  before(() => {
    goodUser = {name: 'Adolfo'};
    otheGoodGuy = {name: 'Karl'};
    badUser = {name: ''};
  });

  describe('Create User', () => {
    it('Should have a name', async () => {
      const user = await createUser(goodUser);
      user.should.have.property('name');
    });

    it('Should throw error on empty name', async () => {
      try {
        await createUser(badUser);
      } catch (err) {
        should.exist(err);
      };
    });

    it('Should throw error when the user name is taken', async () => {
      createUser(otheGoodGuy);
      try {
        await createUser(otheGoodGuy);
      } catch (err) {
        should.exist(err);
      }
    });

  });

});

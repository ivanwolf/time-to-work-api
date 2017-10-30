process.env.NODE_ENV = 'test';
console.log('Setup Tests');

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../src/app');
const knex = require('../src/connection');
const PORT = 8080;

const server = app.listen(PORT);

module.exports = {
  chai,
  should,
  server,
  knex,
};

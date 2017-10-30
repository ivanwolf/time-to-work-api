const knex = require('knex');
const config = require('./config/database');

const connection = knex(config);

module.exports = connection;

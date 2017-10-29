const knex = require('knex');
const config = require('../config/database');
const {Model} = require('objection');
const User = require('./User');

const connection = knex(config);

Model.knex(connection);

module.exports = {
  User,
};

const Sequelize = require('sequelize');
const configDatabase = require('./config/database');
const config = configDatabase[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config);

module.exports = sequelize;


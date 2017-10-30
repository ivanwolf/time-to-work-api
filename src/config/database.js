const path = require('path');
const env = process.env.NODE_ENV || 'development';

const connection = {
  default: {
    host: '127.0.0.1',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  development: {
    database: 'ttw-dev',
  },
  test: {
    database: 'ttw-test',
  },
};

const result = {
  client: 'pg',
  connection: Object.assign({}, connection.default, connection[env]),
  debug: process.env.NODE_ENV !== 'production',
  migrations: {
    directory: path.join(__dirname, '..', 'migrations'),
  },
  seeds: {
    directory: path.join(__dirname, '..', 'seeds'),
  },
};

module.exports = result;
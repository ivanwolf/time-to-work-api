module.exports = {
  development: {
    database: 'ttw-dev',
    dialect: 'postgres',
    host: '127.0.0.1',
    username: process.env.DB_USERNAME,
  },
  test: {
    database: 'ttw-test',
    dialect: 'postgres',
    host: '127.0.0.1',
    username: process.env.DB_USERNAME,
  },
};

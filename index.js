require('dotenv').config();

const app = require('./src/app');
const db = require('./src/models');

const PORT = process.env.PORT || 8080;

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(PORT, (err) => {
      if (err) {
        return console.error('Failed', err);
      }
      console.log(`Listening on port ${PORT}`);
      return app;
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const knex = require('knex');
const config = require('./knexfile');

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

const db = knex(dbConfig);

// Тестирование соединения
db.raw('SELECT 1')
  .then(() => {
    console.log('Connected to the database successfully');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;
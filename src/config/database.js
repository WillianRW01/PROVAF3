const Sequelize = require('sequelize');

const database = new Sequelize(
    'exemplo',
    'root',
    '',
    { host: 'localhost', dialect: 'mysql' }
)

module.exports = database;
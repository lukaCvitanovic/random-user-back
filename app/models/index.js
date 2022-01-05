const { DB, USER, HOST, PASSWORD, dialect, pool } = require('@/config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(DB, USER, PASSWORD,
  {
    host: HOST,
    dialect,
  },
  pool,
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;

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

db.users = require('@/app/models/users')(sequelize, Sequelize.DataTypes);
db.spots = require('@/app/models/spots')(sequelize, Sequelize.DataTypes);
db.categories = require('@/app/models/categories')(sequelize, Sequelize.DataTypes);
db.comments = require('@/app/models/comments')(sequelize, Sequelize.DataTypes);

module.exports = db;

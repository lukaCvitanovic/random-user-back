'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ comments: Comment, categories: Category }) {
      Spot.hasMany(Comment);
      Spot.belongsToMany(Category, { through: 'SpotCategories' })
    }
  };
  Spot.init({
    name: DataTypes.STRING,
    lat: DataTypes.DOUBLE,
    lng: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
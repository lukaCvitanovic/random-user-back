'use strict';
const { Model } = require('sequelize');
const TitleValues = require('@/app/enums/title.enum');
const GenderValues = require('@/app/enums/gender.enum');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    title: {
      type: DataTypes.ENUM,
      values: TitleValues,
    },
    gender: {
      type: DataTypes.ENUM,
      values: GenderValues,
    },
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
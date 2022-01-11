'use strict';
const faker = require('faker');
const random = require('lodash/random');
const times = require('lodash/times');

const TitleValues = require('@/app/enums/title.enum');
const GenderValues = require('@/app/enums/gender.enum');

const NUM_OF_USERS = 100;

const generateUser = () => {
  const GenderIndex = random(0, GenderValues.length - 1);
  return {
    firstName: faker.name.firstName(GenderIndex),
    lastName: faker.name.lastName(GenderIndex),
    title: TitleValues[GenderIndex],
    gender: GenderValues[GenderIndex],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

module.exports = {
  up: async ({ context: queryInterface }) => {
    return queryInterface.bulkInsert('Users', times(NUM_OF_USERS, generateUser));
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

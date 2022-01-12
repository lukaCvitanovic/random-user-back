'use strict';
const faker = require('faker');
const times = require('lodash/times');

const NUM_OF_CATEGORIES = 25;

const generateCategories = () => ({
  name: faker.lorem.word(),
  createdAt: new Date(),
  updatedAt: new Date(),
});

module.exports = {
  up: async ({ context: queryInterface }) => {
    return queryInterface.bulkInsert('Categories', times(NUM_OF_CATEGORIES, generateCategories));
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};

'use strict';
const faker = require('faker');
const times = require('lodash/times');

const NUM_OF_COMMENTS = 1000;

const generateComments = () => ({
  text: faker.lorem.text(),
  createdAt: new Date(),
  updatedAt: new Date(),
});

module.exports = {
  up: async ({ context: queryInterface }) => {
    return queryInterface.bulkInsert('Comments', times(NUM_OF_COMMENTS, generateComments));
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};

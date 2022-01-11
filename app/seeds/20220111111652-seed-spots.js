'use strict';
const faker = require('faker');
const times = require('lodash/times');

const NUM_OF_SPOTS = 100;
const CROATIA_EDGES = {
  lat: {
    min: 42.383333,
    max: 46.55,
  },
  lng: {
    min: 13.5,
    max: 19.45
  }
};

const generateSpots = () => ({
  name: faker.lorem.word(),
  lat: faker.address.latitude(CROATIA_EDGES.lat.max, CROATIA_EDGES.lat.min),
  lng: faker.address.latitude(CROATIA_EDGES.lng.max, CROATIA_EDGES.lng.min),
  createdAt: new Date(),
  updatedAt: new Date(),
});

module.exports = {
  up: async ({ context: queryInterface }) => {
    return queryInterface.bulkInsert('Spots', times(NUM_OF_SPOTS, generateSpots));
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Spots', null, {});
  }
};

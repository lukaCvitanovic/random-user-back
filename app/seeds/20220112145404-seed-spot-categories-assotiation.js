'use strict';
const times = require('lodash/times');
const random = require('lodash/random');

const NUM_OF_RELATIONS = 200;

const spotCategories = new Map();

const getSpotIds = (queryInterface) => {
  return new Promise((resolve, reject) => {
    queryInterface.sequelize.query('SELECT id FROM Spots', { type: queryInterface.sequelize.QueryTypes.SELECT, })
      .then((spotIds) => resolve(spotIds))
      .catch((error) => reject(error));
  });
};

const getCategoryIds = (queryInterface) => {
  return new Promise((resolve, reject) => {
    queryInterface.sequelize.query('SELECT id FROM Categories', { type: queryInterface.sequelize.QueryTypes.SELECT })
      .then((categoryIds) => resolve(categoryIds))
      .catch((error) => reject(error));
  });
};

const generateSpotCategories = (spotsIds, categoryIds) => {
  const getIds = (idArray) => idArray[random(0, idArray.length - 1)].id;

  const pairesToString = ([first, second]) => `${first}${second}`;
  
  let sugestedPair = [getIds(spotsIds), getIds(categoryIds)];
  while (spotCategories.has(pairesToString(sugestedPair))) sugestedPair = [getIds(spotsIds), getIds(categoryIds)];

  const [SpotId, CategoryId] = sugestedPair;
  spotCategories.set(pairesToString(sugestedPair), {
    SpotId,
    CategoryId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

const mapToArray = (map) => {
  const array = [];
  const iterator = map.values();

  let iteration = iterator.next();
  while (!iteration.done) {
    array.push(iteration.value);
    iteration = iterator.next();
  }

  return array;
};

module.exports = {
  up: async ({ context: queryInterface }) => {
    const spotsIds = await getSpotIds(queryInterface);
    const categoryIds = await getCategoryIds(queryInterface);

    times(NUM_OF_RELATIONS, () => generateSpotCategories(spotsIds, categoryIds));

    return queryInterface.bulkInsert('SpotCategories', mapToArray(spotCategories));
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('SpotCategories', null, {});
  }
};

'use strict';
const random = require('lodash/random');
const times = require('lodash/times');

const getCount = (queryInterface) => {
  return new Promise((resolve, reject) => {
    queryInterface.sequelize.query('SELECT COUNT(id) AS count FROM Comments', {
      type: queryInterface.sequelize.QueryTypes.COUNT
    })
    .then((count) => resolve(count[0][0].count))
    .catch((error) => reject(error));
  });
};
const generateAssociation = async (results, queryInterface) => {
  const count = await getCount(queryInterface);
  
  const bulkUpdates = [];
  times(count, (index) => {
    const insertedId = results[random(0, results.length - 1)].id;
    bulkUpdates.push(queryInterface.bulkUpdate('Comments', {
      SpotId: insertedId
    }, {
      id: index + 1
    }));
  });

  return Promise.all(bulkUpdates);

};

module.exports = {
  up: async ({ context: queryInterface }) => {
    return queryInterface.sequelize.query(
      'SELECT id FROM Spots',
      {
        replacements: ['admin'],
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    )
    .then((results) => generateAssociation(results, queryInterface));
  },

  down: async () => {}
};

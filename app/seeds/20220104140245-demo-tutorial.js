'use strict';

module.exports = {
  up: async ({ context: queryInterface }) => {
    return queryInterface.bulkInsert('Tutorials', [{
      title: 'demo tut',
      description: 'random desc',
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  down: async ({ context: queryInterface }) => {
    return queryInterface.bulkDelete('Tutorials', null, {});
  }
};

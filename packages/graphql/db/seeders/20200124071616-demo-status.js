'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('status', [{
      slug: 'active',
      name: 'Active'
    }, {
      slug: 'deactive',
      name: 'Deactive'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('status', null, {});
  }
};

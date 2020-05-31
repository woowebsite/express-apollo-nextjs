'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('priorities', {
      id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      slug: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(256),
        allowNull: false
      }
    }, {
      tableName: 'priorities',
      timestamps: false
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("priorities");
  }
};

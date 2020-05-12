"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("VoteTokens", {
      userId: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      jamId: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      entryId: {
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("VoteTokens");
  },
};

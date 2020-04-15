"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        id: "eli7vh",
        username: "eli7vh",
        name: "Elijah",
        password: "toffee15",
        email: "elijahlucian@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "toffee",
        username: "toffee",
        name: "El Doge",
        password: "toffee15",
        email: "vapsquad@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};

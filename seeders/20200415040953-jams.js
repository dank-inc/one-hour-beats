"use strict";

module.exports = {
  up: (q, Sequelize) => {
    return q.bulkInsert("Jam", [
      {
        id: "dank-rhinos",
        name: "first one hour beat!",
        description: "make a beat within the hour! anything goes!",
        timeLimit: 60 * 4,
        startedAt: new Date(),
        userId: "eli7vh", // createdBy
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cool-unicorns",
        name: "a new ohb",
        description: "make a sketch with only human noises!",
        timeLimit: 3600,
        startedAt: null,
        userId: "toffee",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (q, Sequelize) => {
    return q.bulkDelete("Jam", null, {});
  },
};

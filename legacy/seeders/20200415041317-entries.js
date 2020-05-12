"use strict";

module.exports = {
  up: (q, Sequelize) => {
    return q.bulkInsert("entries", [
      {
        id: "whatsadik4",
        link: `https://soundcloud.com/vapsquad/vapsquad-whats-a-dik-4`,
        title: "whats a dik 4",
        artist: "vapsquad",
        userId: "eli7vh",
        jamId: "dank-rhinos",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (q, Sequelize) => {
    return q.bulkDelete("Entries", null, {});
  },
};

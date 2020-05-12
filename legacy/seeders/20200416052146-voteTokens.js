"use strict";

module.exports = {
  up: (q, Sequelize) => {
    return q.bulkInsert("vote_tokens", [
      { jamId: "dank-rhinos", userId: "eli7vh" },
    ]);
  },

  down: (q, Sequelize) => {
    return q.bulkDelete("VoteTokens", null, {});
  },
};

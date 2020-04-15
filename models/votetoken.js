"use strict";
module.exports = (sequelize, DataTypes) => {
  const VoteToken = sequelize.define(
    "VoteToken",
    {
      userId: DataTypes.STRING,
      jamId: DataTypes.STRING,
      entryId: DataTypes.STRING,
    },
    {}
  );
  VoteToken.associate = function (models) {};
  return VoteToken;
};

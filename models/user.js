"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      thumbs: DataTypes.INTEGER,
      wins: DataTypes.INTEGER,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};

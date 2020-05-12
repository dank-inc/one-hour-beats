import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Jam = sequelize.define(
    "Jam",
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      timeLimit: DataTypes.INTEGER,
      userId: DataTypes.STRING,
      startedAt: DataTypes.DATE,
    },
    {}
  );
  Jam.associate = function (models) {
    // associations can be defined here
  };
  return Jam;
};

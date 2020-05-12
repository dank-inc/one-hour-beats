import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Entry = sequelize.define(
    "Entry",
    {
      link: DataTypes.STRING,
      title: DataTypes.STRING,
      artist: DataTypes.STRING,
      userId: DataTypes.STRING,
      jamId: DataTypes.STRING,
    },
    {
      tableName: "entries",
    }
  );
  Entry.associate = function (models) {
    // associations can be defined here
  };
  return Entry;
};

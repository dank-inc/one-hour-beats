import { DataTypes } from "sequelize";

export default (sequelize) => {
  const VoteToken = sequelize.define(
    "VoteToken",
    {
      userId: DataTypes.STRING,
      jamId: DataTypes.STRING,
      entryId: DataTypes.STRING,
    },
    {}
  );
  VoteToken.removeAttribute("id");
  VoteToken.associate = function (models) {};
  return VoteToken;
};

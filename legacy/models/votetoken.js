import { DataTypes } from "sequelize";

export default (sequelize) => {
  const VoteToken = sequelize.define(
    "VoteToken",
    {
      userId: DataTypes.STRING,
      jamId: DataTypes.STRING,
      entryId: DataTypes.STRING,
    },
    {
      tableName: "vote_tokens",
      timestamps: false,
    }
  );
  VoteToken.removeAttribute("id");
  // VoteToken.removeAttribute("createdAt");
  // VoteToken.removeAttribute("updatedAt");
  VoteToken.associate = function (models) {};
  return VoteToken;
};

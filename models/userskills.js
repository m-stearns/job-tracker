"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserSkills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        primaryKey: "userId",
        as: "user"
      });
      this.belongsTo(models.Skill, {
        primaryKey: "skillId",
        as: "skill"
      });
    }
  }
  UserSkills.init(
    {
      skillId: { type: DataTypes.INTEGER, primaryKey: true },
      userId: { type: DataTypes.UUID, primaryKey: true },
    },
    {
      sequelize,
      modelName: "UserSkills",
    }
  );
  return UserSkills;
};

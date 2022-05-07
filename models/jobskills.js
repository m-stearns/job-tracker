"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JobSkills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Job, {
        foreignKey: "jobId",
        as: "job",
      });
      this.belongsTo(models.Skill, {
        foreignKey: "skillId",
        as: "skill",
      });
    }
  }
  JobSkills.init(
    {
      skillId: { type: DataTypes.INTEGER, primaryKey: true, references: { model: "Skills", key: "id" } },
      jobId: { type: DataTypes.INTEGER, primaryKey: true, references: { model: "Jobs", key: "id" } },
    },
    {
      sequelize,
      modelName: "JobSkills",
    }
  );
  return JobSkills;
};

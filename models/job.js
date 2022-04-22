"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Job.init(
    {
      internship: DataTypes.BOOLEAN,
      title: DataTypes.STRING,
      company: DataTypes.STRING,
      description: DataTypes.TEXT,
      link: DataTypes.TEXT,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Job",
    }
  );
  return Job;
};

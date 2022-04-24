'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    static associate(models) {
      // define association here
    }
  }
  Job.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    internship: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    link: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM("Applied", "Interview Scheduled", "Decision Pending", "Accepted", "Rejected"),
      defaultValue: "Applied",
    },
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};
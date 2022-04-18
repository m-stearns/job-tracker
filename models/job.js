'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Job.init({
    internship: DataTypes.BOOLEAN,
    title: DataTypes.STRING,
    company: DataTypes.STRING,
    description: DataTypes.TEXT,
    link: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};
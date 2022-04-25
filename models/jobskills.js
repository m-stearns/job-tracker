'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobSkills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  JobSkills.init({
    skillId: DataTypes.UUID,
    jobId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'JobSkills',
  });
  return JobSkills;
};
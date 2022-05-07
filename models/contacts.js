"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Job, {
        foreignKey: "jobId",
      });
    }
  }
  Contacts.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNo: DataTypes.STRING,
      company: DataTypes.STRING,
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "id",
        },
      },
      jobId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Jobs",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Contacts",
      timestamps: true,
    }
  );
  return Contacts;
};

"use strict";

const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Job, {
        foreignKey: "userId",
      });
    }

    genAuthToken() {
      const userId = this.get("id");
      const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 * 14, // 2 weeks
      });
      return token;
    }

    static async authenticate(email, password) {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return;
      }
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        return user;
      }
    }

    static findByToken(token) {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return this.findByPk(decodedToken.userId);
      } catch (error) {
        throw new Error(error);
      }
    }

    toJSON() {
      // filter out password when returning on create
      const userObj = { ...this.get() };
      delete userObj.password;
      return userObj;
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );
  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    user.id = uuid.v4();
  });

  return User;
};

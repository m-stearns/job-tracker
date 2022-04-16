"use strict";

const { User } = require("../models");

module.exports = {
  async up() {
    await User.create({
      name: "John Doe",
      email: "jdoe@email.com",
      password: "supersecret",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

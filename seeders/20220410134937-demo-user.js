"use strict";

const { User } = require("../models");

module.exports = {
  async up() {
    await User.create({
      id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
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

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Contacts", [{
      name: "MyDemo Contact",
      email: "mydemo.contact@email.com",
      phoneNo: "555-555-5555",
      company: "Jobby JobSpot",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Contacts", null, {});
  }
};

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert("Skills", [{
       name: "Python",
       desc: "Progamming language",
       createdAt: new Date(),
       updatedAt: new Date(),
   }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Skills", null, {});
  }
};

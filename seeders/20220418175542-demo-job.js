'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Jobs", [{
      internship: false,
      title: "Software Engineer III",
      company: "Dream Company",
      description: "Super software engineer doing super awesome things",
      link: "https://www.google.com/",
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "Applied",
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Jobs", null, []);
  }
};

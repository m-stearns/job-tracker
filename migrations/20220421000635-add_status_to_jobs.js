'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Jobs",
          "status",
          {
            allowNull: false,
            type: Sequelize.ENUM("Applied", "Interview Scheduled", "Decision Pending", "Accepted", "Rejected"),
            defaultValue: "Applied",
          },
          {
            transaction: t,
          }
        ),
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Jobs", "status");
  }
};

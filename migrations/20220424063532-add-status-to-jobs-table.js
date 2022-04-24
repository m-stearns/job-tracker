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
        queryInterface.changeColumn(
          "Jobs", 
          "title", 
          {
            type: Sequelize.STRING,
            allowNull: false
          },
          {
            transaction: t,
          }
        ),
        queryInterface.changeColumn(
          "Jobs",
          "company",
          {
            type: Sequelize.STRING,
            allowNull: false,
          },
          {
            transaction: t,
          }
        ),
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Jobs", "status", {transaction: t}),
        queryInterface.changeColumn(
          "Jobs",
          "title",
          {
            type: Sequelize.STRING,
            allowNull: true 
          }, 
          {
            transaction: t
          }
        ),
        queryInterface.changeColumn(
          "Jobs",
          "company",
          {
            type: Sequelize.STRING,
            allowNull: true 
          }, 
          {
            transaction: t
          }
        ),
      ]);
    });
  }
};
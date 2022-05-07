"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Contacts", "jobId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Jobs",
        key: "id",
      },
      onDelete: "cascade",
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Contacts", "jobId");
  },
};

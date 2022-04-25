"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Skills", "desc", { transaction: t }),
        queryInterface.addColumn(
          "Skills",
          "userId",
          {
            type: Sequelize.UUID,
            references: {
              model: { tableName: "Users" },
              key: "id",
            },
            onDelete: "cascade",
            allowNull: false,
          },
          {
            transaction: t,
          }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn("Skills", "desc", {
          type: Sequelize.STRING,
        }),
        queryInterface.removeColumn("Skills", "userId"),
      ]);
    });
  },
};

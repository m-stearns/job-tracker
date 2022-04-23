"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Contacts",
          "userId",
          { allowNull: false, type: Sequelize.UUID },
          {
            transaction: t,
          }
        ),
        queryInterface.addConstraint("Contacts", {
          fields: ["userId"],
          type: "foreign key",
          references: {
            table: "Users",
            field: "id",
          },
          onDelete: "cascade",
          allowNull: false,
          transaction: t,
        }),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Contacts", "userId");
  },
};

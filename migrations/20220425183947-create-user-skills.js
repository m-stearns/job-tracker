"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserSkills", {
      skillId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: "Skills" },
          key: "id",
        },
        onDelete: "cascade",
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: { tableName: "Users" },
          key: "id",
        },
        onDelete: "cascade",
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }).then(() => {
      return queryInterface.addConstraint('UserSkills', {
        fields: ['skillId', 'userId'],
        type: 'primary key',
        name: 'UserSkills_pkey'
      })
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserSkills");
  },
};

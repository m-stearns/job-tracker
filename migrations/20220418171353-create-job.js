'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      internship: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Users',
            schema: 'public'
          },
          key: 'id'
        },
        allowNull: false,
      },
      link: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Jobs');
  }
};
const { Sequelize } = require('sequelize');
const TitleValues = require('@/app/enums/title.enum');
const GenderValues = require('@/app/enums/gender.enum');

async function up({ context: queryInterface }) {
	await queryInterface.createTable('User', {
		id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.ENUM,
      values: TitleValues,
    },
    gender: {
      type: Sequelize.ENUM,
      values: GenderValues, 
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
}

async function down(queryInterface) {
	await queryInterface.dropTable('User');
}

module.exports = { up, down };
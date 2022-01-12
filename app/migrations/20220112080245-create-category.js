const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
	await queryInterface.createTable('Categories', {
		id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
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
	await queryInterface.dropTable('Categories');
}

module.exports = { up, down };
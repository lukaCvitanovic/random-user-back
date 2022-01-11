const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
	await queryInterface.createTable('Spots', {
		id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    lat: {
      type: Sequelize.DOUBLE
    },
    lng: {
      type: Sequelize.DOUBLE
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
	await queryInterface.dropTable('Spots');
}

module.exports = { up, down };
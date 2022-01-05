const { Umzug, SequelizeStrage, SequelizeStorage } = require('umzug');
const { sequelize } = require('@/app/models');

const generateUmzugConfig = (glob) => ({
    migrations: { glob },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});

const migrator = new Umzug(generateUmzugConfig('app/migrations/*.js'));
const seeder = new Umzug(generateUmzugConfig('app/seeds/*.js'));

module.exports = () => migrator.up().then(() => seeder.up());

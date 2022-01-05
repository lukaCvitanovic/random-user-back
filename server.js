require('module-alias/register');
const express = require('express');
const cors = require('cors');
const port = 7000;

const app = express();

const conrsOptions = {
  origin: 'http://localhost:7001',
};

app.use(cors(conrsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// db.sequelize.sync({ force: true })
//   .then(() => console.log('Drop and re-sync db.'));
const umzug = require('@/app/models/umzug');
umzug().then(() => console.log('migrated and seeded'));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome' });
});

require('@/app/routes/tutorials.routes.js')(app);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

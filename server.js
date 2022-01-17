require('module-alias/register');
const express = require('express');
const cors = require('cors');
const port = 7000;

const app = express();

const conrsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(conrsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const umzug = require('@/app/models/umzug');
umzug().then(() => console.log('migrated and seeded'));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome' });
});

require('@/app/routes')(app);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

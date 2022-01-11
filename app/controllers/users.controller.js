const { users: Users, Sequelize: { Op } } = require('@/app/models');

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  const { title, firstName, lastName } = req.body;
  const newUsers = {
    title,
    firstName,
    lastName,
  };

  Users.create(newUsers)
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send({
        message: error.message || 'Some error ocured while creating a Users.',
      });
    });
};

exports.findOne = (req, res) => {
  const { id } = req.params;

  Users.findByPk(id)
    .then((data) => (data ? res.send(data) : res.status(404).send({ message: `Cannot find Users with id=${id}.` })))
    .catch((error) => res.status(500).send({ message: error.message || `Error retreving Users with id=${id}.` }));
};

exports.findAll = (req, res) => {
  const { firstName, lastName } = req.query;

  const generateLikenes = (property) => property ? { [property]: { [Op.like]: `%${property}` } } : {}
  const condition = firstName || lastName ? { ...generateLikenes(firstName), ...generateLikenes(lastName) } : null

  Users.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send({
        message: error.message || 'Some error ocured while retriving users.',
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;

  Users.update(req.body, { where: { id } })
    .then(([num]) => (num === 1
      ? res.send({ message: 'Users was updated successfully.' })
      : res.send({ message: `Cannot update Users with id=${id}. Maybe user was not found or req.body was empty.` })))
    .catch((error) => res.status(500).send({ message: error.message || `Error updating user with id=${id}.` }));
};

exports.delete = (req, res) => {
  const { id } = req.params;

  Users.destroy({ where: { id } })
    .then((num) => (num === 1
      ? res.send({ message: 'Users was successfully deleted.' })
      : res.send({ message: `Cannot delete Users with id=${id}. Maybe Users was not found.` })))
    .catch((error) => res.status(500).send({ message: error.message || `Cannot delete Users with id=${id}.` }));
};

exports.deleteAll = (req, res) => {
  Users.destroy({ where: {}, truncate: false })
    .then((nums) => res.send({ message: `${nums} users deleted successfully.` }))
    .catch((error) => res.status(500).send({ message: error.message || 'Some error ocurred while deleting all users.' }));
};

exports.findAllPublished = (req, res) => {
  Users.findAll({ where: { published: true } })
    .then((data) => res.send(data))
    .catch((error) => res.status(500).send({ message: error.message || 'Some error ocurred while retreving users.' }));
};

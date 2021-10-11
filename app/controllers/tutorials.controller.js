const { tutorials: Tutorial, Sequelize: { Op } } = require('@/app/models');

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  const { title, description, published } = req.body;
  const tutorial = {
    title,
    description,
    published: published || false,
  };

  Tutorial.create(tutorial)
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send({
        message: error.message || 'Some error ocured while creating a Tutorial.',
      });
    });
};
exports.findOne = (req, res) => {
  const { id } = req.params;

  Tutorial.findByPk(id)
    .then((data) => (data ? res.send(data) : res.status(404).send({ message: `Cannot find Tutorial with id=${id}.` })))
    .catch((error) => res.status(500).send({ message: error.message || `Error retreving Tutorial with id=${id}.` }));
};
exports.findAll = (req, res) => {
  const { title } = req.query;
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send({
        message: error.message || 'Some error ocured while retriving tutorials.',
      });
    });
};
exports.update = (req, res) => {
  const { id } = req.params;

  Tutorial.update(req.body, { where: { id } })
    .then(([num]) => (num === 1
      ? res.send({ message: 'Tutorial was updated successfully.' })
      : res.send({ message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body was empty.` })))
    .catch((error) => res.status(500).send({ message: error.message || `Error updating tutorial with id=${id}.` }));
};
exports.delete = (req, res) => {
  const { id } = req.params;

  Tutorial.destroy({ where: { id } })
    .then((num) => (num === 1
      ? res.send({ message: 'Tutorial was successfully deleted.' })
      : res.send({ message: `Cannot delete Tutorila with id=${id}. Maybe Tutorial was not found.` })))
    .catch((error) => res.status(500).send({ message: error.message || `Cannot delete Tutorial with id=${id}.` }));
};
exports.deleteAll = (req, res) => {
  Tutorial.destroy({ where: {}, truncate: false })
    .then((nums) => res.send({ message: `${nums} Tutorials deleted successfully.` }))
    .catch((error) => res.status(500).send({ message: error.message || 'Some error ocurred while deleting all Tutorials.' }));
};
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then((data) => res.send(data))
    .catch((error) => res.status(500).send({ message: error.message || 'Some error ocurred while retreving tutorials.' }));
};

const { categories: Category, Sequelize: { Op } } = require('@/app/models');
const isEmpty = require('lodash/isEmpty');

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: 'Name cannot be empty!',
        });
    }
    
    const { name } = req.body;
    const newCategory = { name };

    Category.create(newCategory)
        .then((data) => res.send(data))
        .catch((error) => {
            res.status(500).send({
                message: error.message || 'Some error ocured while creating a Category.',
            });
        });
};

exports.findOne = (req, res) => {
    const { id } = req.params;

    Category.findByPk(id)
        .then((data) => (data ? res.send(data) : res.status(400).send({ message: `Cannot find Category with id=${id}.` })))
        .catch((error) => res.status(500).send({ message: error.message || `Error retreving Category with id=${id}.` }));
};

exports.findAll = (req, res) => {
    const { name } = req.body;

    const condition = (name ? { name: { [Op.like]: `%${name}` } } : {});

    Category.findAll({ where: condition })
        .then((data) => res.send(data))
        .catch((error) => res.status(500).send({ message: error.message || 'Error ocured while retriving categories.' }));
};

exports.update = (req, res) => {
    const { id } = req.params;

    if (isEmpty(req.body)) res.status(400).send({ message: 'req.body is empty. To update the category please send the information you wish to update the category with' });

    Category.update(req.body, { where: { id } })
        .then(([verdict]) => (verdict === 1
            ? res.send({ message: `Category with id=${id} was updated successfully` })
            : res.send({ message: `Cannot update category with id=${id},` }))
        .catch((error) => res.status(500).send({ message: error.message || `Error updating category with id=${id}.` })));
};

exports.delete = (req, res) => {
    const { id } = req.params;

    Category.destroy({ where: { id } })
        .then((num) => (num === 1
            ? res.send({ message: 'Category was successfully deleted.' })
            : res.status(400).send({ message: `Cannot delete Category with id=${id}. Maybe Category was not found.` })))
        .catch((error) => res.status(500).send({ message: error.message || `Cannot delete Category with id=${id}.` }));
};

exports.deleteAll = (req, res) => {
    Category.destroy({ where: {}, truncate: false })
        .then((nums) => res.send({ message: `${nums} categories deleted successfully.` })
        .catch((error) => res.status(500).send({ message: error.message || `Some error ocured while deleting all categories.` })));
};
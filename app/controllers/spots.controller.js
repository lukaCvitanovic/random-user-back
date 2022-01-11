const { spots: Spot, Sequelize: { Op } } = require('@/app/models');
const isEmpty = require('lodash/isEmpty');

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: 'Name cannot be empty!',
        });
    }
    
    const { name, lat, lng } = req.body;
    const newSpot = {
        name,
        lat,
        lng,
    };

    Spot.create(newSpot)
        .then((data) => res.send(data))
        .catch((error) => {
            res.status(500).send({
                message: error.message || 'Some error ocured while creating a Spot.',
            });
        });
};

exports.findOne = (req, res) => {
    const { id } = req.params;

    Spot.findByPk(id)
        .then((data) => (data ? res.send(data) : res.status(400).send({ message: `Cannot find Spot with id=${id}.` })))
        .catch((error) => res.status(500).send({ message: error.message || `Error retreving Spot with id=${id}.` }));
};

exports.findAll = (req, res) => {
    const { name } = req.body;

    const condition = (name ? { name: { [Op.like]: `%${name}` } } : {});

    Spot.findAll({ where: condition })
        .then((data) => res.send(data))
        .catch((error) => res.status(500).send({ message: error.message || 'Error ocured while retriving spots.' }));
};

exports.update = (req, res) => {
    const { id } = req.params;

    if (isEmpty(req.body)) res.status(400).send({ message: 'req.body is empty. To update the spot please send the information you wish to update the spot with' });

    Spot.update(req.body, { where: { id } })
        .then(([verdict]) => (verdict === 1
            ? res.send({ message: `Spot with id=${id} was updated successfully` })
            : res.send({ message: `Cannot update spot with id=${id},` }))
        .catch((error) => res.status(500).send({ message: error.message || `Error updating spot with id=${id}.` })));
};

exports.delete = (req, res) => {
    const { id } = req.params;

    Spot.destroy({ where: { id } })
        .then((num) => (num === 1
            ? res.send({ message: 'Spot was successfully deleted.' })
            : res.status(400).send({ message: `Cannot delete Spot with id=${id}. Maybe Spot was not found.` }))
        .catch((error) => res.status(500).send({ message: error.message || `Cannot delete Spot with id=${id}.` })));
};

exports.deleteAll = (req, res) => {
    Spot.destroy({ where: {}, truncate: false })
        .then((nums) => res.send({ message: `${nums} spots deleted successfully.` })
        .catch((error) => res.status(500).send({ message: error.message || `Some error ocured while deleting all spots.` })));
};
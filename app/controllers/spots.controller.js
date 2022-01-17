const { spots: Spot, categories: Category, sequelize, Sequelize: { Op } } = require('@/app/models');
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
            : res.status(400).send({ message: `Cannot delete Spot with id=${id}. Maybe Spot was not found.` })))
        .catch((error) => res.status(500).send({ message: error.message || `Cannot delete Spot with id=${id}.` }));
};

exports.deleteAll = (req, res) => {
    Spot.destroy({ where: {}, truncate: false })
        .then((nums) => res.send({ message: `${nums} spots deleted successfully.` })
        .catch((error) => res.status(500).send({ message: error.message || `Some error ocured while deleting all spots.` })));
};

//Coding examples and implementation tests

// Eager loading example
exports.findOneWithComments = (req, res) => {
    const { id } = req.params;

    Spot.findByPk(id, { include: Category })
        .then((data) => (data ? res.send(data) : res.status(400).send({ message: `Cannot find Spot with id=${id}.` })))
        .catch((error) => res.status(500).send({ message: error.message || `Error ocured while getting spot with id=${id}.` }));
};

// Sub-queries example
exports.findOneCommentsCount = (req, res) => {
    const { id } = req.params;

    Spot.findByPk(id, {
        attributes: {
            include: [
                [
                    sequelize.literal(`(
                        SELECT COUNT(*) 
                        FROM SpotCategories 
                        WHERE SpotId = id
                    )`),
                    'countSpotCategories'
                ]
            ]
        }
    })
        .then((data) => (data ? res.send(data) : res.status(400).send({ message: `Cannot find Spot with id=${id}.` })))
        .catch((error) => res.status(500).send({ message: error.message || `Error ocured while gettign Spot with id=${id}.` }));
};

// Example of limits and pagination
exports.search = (req, res) => {
    const pageSizes = [10, 15, 20, 25];

    const page = (req.query.page ? Number(req.query.page) : 1);
    const pageSize = (req.query['page_size'] ? Number(req.query['page_size']) : pageSizes[0]);

    if (!pageSizes.includes(pageSize)) {
        res.status(400).send({ message: 'Page size can be only 10, 15, 20, 25.' });
        return;
    }

    if (page <= 0) {
        res.status(400).send({ message: 'Page number cannot be smaller than 0.' });
        return;
    }

    Spot.findAndCountAll({ offset: (page - 1) * pageSize, limit: pageSize })
        .then((data) => {
            const totalPages = data.count / pageSize;

            if (page > totalPages) res.status(400).send({ message: `Page ${page} does not exist.` });
            else res.send({ page, totalPages, ...data });
        })
        .catch((error) => res.status(500).send({ message: error.message || 'Error cured while searching spots.' }));
};
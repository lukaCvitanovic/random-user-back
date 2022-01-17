const { comments: Comment, Sequelize: { Op }, sequelize } = require('@/app/models');
const isEmpty = require('lodash/isEmpty');

exports.create = (req, res) => {
    if (!req.body.text) {
        res.status(400).send({
            message: 'Text cannot be empty!',
        });
    }
    
    const { text } = req.body;
    const newComment = { text };

    Comment.create(newComment)
        .then((data) => res.send(data))
        .catch((error) => {
            res.status(500).send({
                message: error.message || 'Some error ocured while creating a Comment.',
            });
        });
};

exports.findOne = (req, res) => {
    const { id } = req.params;

    Comment.findByPk(id)
        .then((data) => (data ? res.send(data) : res.status(400).send({ message: `Cannot find Comment with id=${id}.` })))
        .catch((error) => res.status(500).send({ message: error.message || `Error retreving Comment with id=${id}.` }));
};

exports.findAll = (req, res) => {
    const { name } = req.body;

    const condition = (name ? { name: { [Op.like]: `%${name}` } } : {});

    Comment.findAll({ where: condition })
        .then((data) => res.send(data))
        .catch((error) => res.status(500).send({ message: error.message || 'Error ocured while retriving comments.' }));
};

exports.update = (req, res) => {
    const { id } = req.params;

    if (isEmpty(req.body)) res.status(400).send({ message: 'req.body is empty. To update the comment please send the information you wish to update the comment with' });

    Comment.update(req.body, { where: { id } })
        .then(([verdict]) => (verdict === 1
            ? res.send({ message: `Comment with id=${id} was updated successfully` })
            : res.send({ message: `Cannot update comment with id=${id},` }))
        .catch((error) => res.status(500).send({ message: error.message || `Error updating comment with id=${id}.` })));
};

exports.delete = (req, res) => {
    const { id } = req.params;

    Comment.destroy({ where: { id } })
        .then((num) => (num === 1
            ? res.send({ message: 'Comment was successfully deleted.' })
            : res.status(400).send({ message: `Cannot delete Comment with id=${id}. Maybe Comment was not found.` })))
        .catch((error) => res.status(500).send({ message: error.message || `Cannot delete Comment with id=${id}.` }));
};

exports.deleteAll = (req, res) => {
    Comment.destroy({ where: {}, truncate: false })
        .then((nums) => res.send({ message: `${nums} comments deleted successfully.` })
        .catch((error) => res.status(500).send({ message: error.message || `Some error ocured while deleting all comments.` })));
};

// Examples and tests

// Example of query/database functions
// Example of finaAndCountAll method
exports.findAndCountLongComments = (req, res) => {
    Comment.findAndCountAll({
        where: sequelize.where(sequelize.fn('char_length', sequelize.col('text')), 25)
    })
        .then((data) => res.send(data))
        .catch((error) => res.status(500).send({ message: error.message || 'Error ocured while getting all Comments with longer text.' }));
};
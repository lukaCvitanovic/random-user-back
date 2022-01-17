const comments = require('@/app/controllers/comments.controller.js');
const router = require('express').Router();

router.post('/', comments.create);
router.get('/:id(\\d+)', comments.findOne);
router.get('/', comments.findAll);
router.patch('/:id(\\d+)', comments.update);
router.delete('/:id(\\d+)', comments.delete);
router.delete('/', comments.deleteAll);

router.get('/long-count', comments.findAndCountLongComments);

module.exports = router;

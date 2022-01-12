const comments = require('@/app/controllers/comments.controller.js');
const router = require('express').Router();

router.post('/', comments.create);
router.get('/:id', comments.findOne);
router.get('/', comments.findAll);
router.patch('/:id', comments.update);
router.delete('/:id', comments.delete);
router.delete('/', comments.deleteAll);

module.exports = router;

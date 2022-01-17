const spots = require('@/app/controllers/spots.controller.js');
const router = require('express').Router();

router.post('/', spots.create);
router.get('/:id(\\d+)', spots.findOne);
router.get('/', spots.findAll);
router.patch('/:id(\\d+)', spots.update);
router.delete('/:id(\\d+)', spots.delete);
router.delete('/', spots.deleteAll);

router.get('/:id(\\d+)/comments', spots.findOneWithComments);
router.get('/:id(\\d+)/comments-count', spots.findOneCommentsCount);
router.get('/search', spots.search);

module.exports = router;

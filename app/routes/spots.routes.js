const spots = require('@/app/controllers/spots.controller.js');
const router = require('express').Router();

router.post('/', spots.create);
router.get('/:id', spots.findOne);
router.get('/', spots.findAll);
router.patch('/:id', spots.update);
router.delete('/:id', spots.delete);
router.delete('/', spots.deleteAll);

module.exports = router;

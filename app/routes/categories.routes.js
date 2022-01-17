const categories = require('@/app/controllers/categories.controller.js');
const router = require('express').Router();

router.post('/', categories.create);
router.get('/:id(\\d+)', categories.findOne);
router.get('/', categories.findAll);
router.patch('/:id(\\d+)', categories.update);
router.delete('/:id(\\d+)', categories.delete);
router.delete('/', categories.deleteAll);

module.exports = router;

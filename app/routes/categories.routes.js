const categories = require('@/app/controllers/categories.controller.js');
const router = require('express').Router();

router.post('/', categories.create);
router.get('/:id', categories.findOne);
router.get('/', categories.findAll);
router.patch('/:id', categories.update);
router.delete('/:id', categories.delete);
router.delete('/', categories.deleteAll);

module.exports = router;

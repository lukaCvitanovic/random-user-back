const users = require('@/app/controllers/users.controller.js');
const router = require('express').Router();

router.post('/', users.create);
router.get('/', users.findAll);
router.get('/published', users.findAllPublished);
router.get('/:id(\\d+)', users.findOne);
router.put('/:id(\\d+)', users.update);
router.delete('/', users.deleteAll);
router.delete('/:id(\\d+)', users.delete);

module.exports = router;
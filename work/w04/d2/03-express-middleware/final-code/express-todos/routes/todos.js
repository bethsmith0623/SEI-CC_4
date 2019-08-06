var express = require('express');
var router = express.Router();
var todosCtrl = require('../controllers/todos');

router.get('/', todosCtrl.index);
router.get('/new', todosCtrl.new);
router.get('/:id', todosCtrl.show);
router.post('/', todosCtrl.create);
router.delete('/:id', todosCtrl.delete);
router.get('/:id/edit', todosCtrl.edit);
router.put('/:id', todosCtrl.update);

module.exports = router;

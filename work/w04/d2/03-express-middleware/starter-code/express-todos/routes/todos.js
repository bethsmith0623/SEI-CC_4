var express = require('express');
var router = express.Router();
var todosCtrl = require('../controllers/todos');

router.get('/', todosCtrl.index);
router.get('/:id', todosCtrl.show);

module.exports = router;

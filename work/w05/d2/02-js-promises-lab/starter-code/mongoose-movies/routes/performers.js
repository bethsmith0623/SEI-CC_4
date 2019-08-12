var express = require('express');
var router = express.Router();
var performersCtrl = require('../controllers/performers');

router.get('/performers/new', performersCtrl.new);
router.post('/performers', performersCtrl.create);
router.post('/movies/:id/performers', performersCtrl.addToCast);

module.exports = router;
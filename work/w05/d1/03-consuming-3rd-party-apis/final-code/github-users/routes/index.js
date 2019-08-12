var express = require('express');
var router = express.Router();
var githubCtrl = require('../controllers/github');

/* GET home page. */
router.get('/', githubCtrl.userDetails);
router.post('/', githubCtrl.userDetails);

module.exports = router;

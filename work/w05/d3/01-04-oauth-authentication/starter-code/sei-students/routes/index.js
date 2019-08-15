var router = require('express').Router();

// The root route renders our only view
router.get('/', function(req, res) {
  res.redirect('/students');
});

module.exports = router;
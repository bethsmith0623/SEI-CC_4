var express = require('express');
var router = express.Router();
var puppiesCtrl = require('../controllers/api/puppies');

/* GET /api/puppies (index) */
router.get('/puppies', puppiesCtrl.index);
router.post('/puppies', puppiesCtrl.create);
router.get('/puppies/:id', puppiesCtrl.show);
router.put('/puppies/:id', puppiesCtrl.update);
router.delete('/puppies/:id', puppiesCtrl.delete);




module.exports = router;

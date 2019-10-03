var express = require('express');
var router = express.Router();
var puppiesCtrl = require('../../controllers/api/puppies');

/* GET /api/puppies */
router.get('/', puppiesCtrl.index);
router.get('/:id', puppiesCtrl.show);
router.post('/', puppiesCtrl.create);
router.delete('/:id', puppiesCtrl.delete);
router.put('/:id', puppiesCtrl.update);

module.exports = router;

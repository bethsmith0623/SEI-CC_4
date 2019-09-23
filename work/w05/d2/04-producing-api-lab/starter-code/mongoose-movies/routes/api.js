const express = require('express');
const router = express.Router();
const moviesApiCtrl = require('../controllers/api/movies');
const performersApiCtrl = require('../controllers/api/performers');

router.get('/movies', moviesApiCtrl.index);
router.post('/movies', moviesApiCtrl.create);
router.get('/movies/:id', moviesApiCtrl.show);
router.put('/movies/:id', moviesApiCtrl.update);
router.delete('/movies/:id', moviesApiCtrl.delete);

router.get('/performers', performersApiCtrl.index);
router.post('/performers', performersApiCtrl.create);
router.get('/performers/:id', performersApiCtrl.show);
router.put('/performers/:id', performersApiCtrl.update);
router.delete('/performers/:id', performersApiCtrl.delete);





module.exports = router;
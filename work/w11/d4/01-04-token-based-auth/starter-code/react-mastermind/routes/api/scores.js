const express = require('express');
const router = express.Router();
const scoresCtrl = require('../../controllers/scores');

router.get('/', scoresCtrl.highScores);
router.post('/', scoresCtrl.create);

module.exports = router;

var express = require('express');
var router = express.Router();

var mutant = require('../controllers/MutantController.js');

router.post('/', mutant.isMutant);
router.get('/stats', mutant.stats);

module.exports = router;

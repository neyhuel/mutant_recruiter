var express = require('express');
var router = express.Router();

var mutant = require('../controllers/MutantController.js');

router.post('/', mutant.isMutant);

module.exports = router;

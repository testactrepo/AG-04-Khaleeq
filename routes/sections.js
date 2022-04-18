var express = require('express');
var router = express.Router();
const sectionController = require('../controllers/sections');

router.get('/getSectionsAndVariables', sectionController.getSectionsAndVariables);
router.get('/getVariableNotes', sectionController.getVariableNotes);
router.get('/getVariableDetails', sectionController.getVariableDetails);

module.exports = router;

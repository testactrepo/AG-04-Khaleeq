var express = require('express');
var router = express.Router();
const chimpController = require('../controllers/mailchimp');

router.post('/addMemberToList', chimpController.addMemberToList);

module.exports = router;

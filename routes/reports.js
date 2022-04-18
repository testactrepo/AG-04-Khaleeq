var express = require('express');
var router = express.Router();
const reportController = require('../controllers/reports');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/getAllData', reportController.getReportData);
router.post('/getFilteredData', reportController.getFilteredReportData);

module.exports = router;

var express = require('express');
var router = express.Router();
var withAuth = require('../middleware');

var login_controller = require('../controller/loginController');
var feedback_controller = require('../controller/feedbackController');


router.post('/register', login_controller.register);
router.post('/login', login_controller.authenticate);
router.get('/ping', withAuth, login_controller.ping);

router.post('/feedback', withAuth, feedback_controller.feedback);
router.get('/rates', feedback_controller.rate_list);
router.get('/skills', feedback_controller.skill_list);

module.exports = router;

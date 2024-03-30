const { Router } = require("express");
const { sendOtp, verifyOtp } = require('../controller/user_controller.js');

const router = Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

module.exports = router;

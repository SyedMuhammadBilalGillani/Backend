const User = require("../models/user_model.js");
const { otpExpiry } = require("../helper/otpExpiry.js");
const otpGenerator = require("otp-generator");
const twilio = require("twilio");

const accountSid = process.env.TWILIO_AUTH_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = new twilio(accountSid, authToken);

const sendOtp = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        const currentDate = new Date();
        await User.findOneAndUpdate(
            { phoneNumber },
            { otp, otpExpiration: new Date(currentDate.getTime()) },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        await twilioClient.messages.create({
            body: `Your OTP is ${otp}`,
            to: phoneNumber,
            from: process.env.TWILIO_AUTH_NUM,
        });
        return res.status(200).json({
            success: true,
            msg: "OTP sent successfully" + otp,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        });
    }
};




const verifyOtp = async (req, res) => {
    const { phoneNumber, otp } = req.body;
    const otpData = await User.findOne({
        phoneNumber,
        otp,
    });

    if (!otpData) {
        return res.status(200).json({
            success: false,
            msg: "OTP invalid",
        });
    }

    const isOtpExpired = await otpExpiry(otpData.otpExpiration);

    if (isOtpExpired) {
        return res.status(400).json({
            success: false,
            msg: "OTP Expired",
        });
    }

    // If OTP is valid and not expired
    return res.status(200).json({
        success: true,
        msg: "OTP Verified Successfully",
    });
};
module.exports = {
    sendOtp,
    verifyOtp,
};

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        // validate: {
        //     validator: function (v) {
        //         // Regular expression to match phone number format (10 digits)
        //         return /^\+\d{1,3}\d{10}$/.test(v); // Assuming country code is prefixed with '+'
        //     },
        //     message: props => `${props.value} is not a valid phone number! Please provide a valid phone number including country code.`
        // }
    },
    otp: {
        type: String,
        // required: true
    },
    otpExpiration: {
        type: Date,
        default: Date.now,
        get: (otpExpiration) => otpExpiration.getTime(),
        set: (otpExpiration) => new Date(otpExpiration)
    }
    // verified: {
    //     type: Boolean,
    //     default: false
    // }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

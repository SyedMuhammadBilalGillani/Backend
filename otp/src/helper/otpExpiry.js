const otpExpiry = async (otpTime) => {
    try {
        const currentDate = new Date();
        const differenceValue = (otpTime - currentDate.getTime()) / 1000;
        differenceValue /= 60;
        const minutes = Math.abs(differenceValue);
        if (minutes > 15) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error.message);
    }
};

module.exports = {
    otpExpiry
};

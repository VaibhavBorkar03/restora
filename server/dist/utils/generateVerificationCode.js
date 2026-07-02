export const generateVerificationCode = (length = 6) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
    // const characters = '0123456789' //for sms
    let verificationCode = ""; //also say that otp
    let charactersLength = characters.length;
    for (let index = 0; index < length; index++) {
        verificationCode =
            verificationCode + characters.charAt(Math.random() * charactersLength);
    }
    return verificationCode;
};

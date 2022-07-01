var bcrypt = require('bcrypt');

exports.encryptpassword = async (password) => {
    try {
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        var pass = await bcrypt.hash(password, salt);
        return {
            status: true,
            encrypt: pass
        }
    } catch (error) {
        return {
            status: false,
            msg: "System Error. Please Try Again."
        }
    }
};

exports.comparepassword = async (params) => {
    try {
        const { password, dbPassword } = params;
        var isCompare = await bcrypt.compare(password, dbPassword);
        return isCompare;
    } catch (error) {
        return false;
    }
}
const bcrypt = require('bcrypt');

const decryptPassword = async (password, hash) => {
    try {
        let result = await bcrypt.compare(password, hash);
        return result;
    }
    catch (err) {
        console.error("Error during password decryption:", err.message);
        return false;
    }
};

module.exports.comparePass =  decryptPassword;
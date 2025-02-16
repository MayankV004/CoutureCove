const bcrypt = require('bcrypt');

const hashPassword = async (password) =>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password , salt);
        return hash;
    }
    catch(err){
        throw new Error(err.message);
    }
};

module.exports.hashPass = hashPassword ;
const bcrypt = require('bcryptjs');

function encrypt(text)
{
    const saltRounds = 9;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(text, salt);
}

function decrypt(text, hash)
{
    return bcrypt.compareSync(text, hash);
}

module.exports = {encrypt, decrypt};
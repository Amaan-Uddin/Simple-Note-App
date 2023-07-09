const jwt = require('jsonwebtoken')

const accessToken = (username) => {
    return jwt.sign(
       { username: username },
       process.env.ACCESS_TOKEN_SECRET,
       { expiresIn: '15m' }
   )
}

const refreshToken = (username) => {
    return jwt.sign(
        { username: username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1h' }
    )
}

module.exports = { accessToken,refreshToken }
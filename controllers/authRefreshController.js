const jwt = require('jsonwebtoken')
const tokens = require('../config/tokens')

const handleRefreshToken = (req,res) => {
    // get the cookies from the client
    const cookie = req.cookies

    // check if the cookies are available and if they have a refresh key
    if(!cookie?.refresh){ return res.redirect('/auth/log') } // ask user to log-in 

    // get the refreshToken from the cookies
    const refreshToken = cookie.refresh

    // verify
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decode) => {
            if(err){ return res.redirect('/') } // forbiden
            // if up to this point there occures no isse we generate a new accessToken and send it to the client 
            // through cookies

            const accessToken = tokens.accessToken(decode.username)

            res.cookie('access',accessToken,{ httpOnly: true, maxAge: 15*60*1000 })
            res.redirect(`/main/${decode.username}`)
        }
    )
}

module.exports = handleRefreshToken
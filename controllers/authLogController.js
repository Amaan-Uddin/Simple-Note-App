const User = require('../model/User')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const tokens = require('../config/tokens')

const handleOldUser = async (req,res) => {
    const { email,password } = req.body // re-assign all the data from the request body object

    const findUser = await User.findOne({ email:email })
    console.log(findUser)
    if(!findUser){ return res.status(404).send(`NOT_FOUND: User ${username} not found in the database `) }

    try {
        // compare the password
        const comparePassword = await bcrypt.compare(password,findUser.password)
        if(!comparePassword){ return res.sendStatus(401) }

        const refreshToken = tokens.refreshToken(findUser.username)
        const accessToken = tokens.accessToken(findUser.username)

        res.cookie('access',accessToken,{ httpOnly:true, maxAge: 15*60*1000 })
        res.cookie('refresh',refreshToken,{ httpOnly:true, maxAge: 60*60*1000 })

        res.redirect(`/main/${findUser.username}`)
    } catch (error) {
        res.sendStatus(500)
    }
}

module.exports = handleOldUser
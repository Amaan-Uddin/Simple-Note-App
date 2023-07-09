const express = require('express')
const router = express.Router()
const handleNewUser = require('../controllers/authSignController')
const handleOldUser = require('../controllers/authLogController')
const handleRefreshToken = require('../controllers/authRefreshController')

// create then authorize
router.get('/sign',(req,res) => {
    res.render('pages/sign-up',{ button:'Sign Up' })
}) 

// authenticate then authorize
router.get('/log',(req,res) => {
    res.render('pages/log-in',{ button:'Log In' })
}) 

router.get('/unauthorized',(req,res) => {
    res.render('unAuthorized')
})

router.post('/unauthorized',handleRefreshToken)
router.post('/sign',handleNewUser)
router.post('/log',handleOldUser)

module.exports = router
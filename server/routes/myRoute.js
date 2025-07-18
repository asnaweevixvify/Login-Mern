const express = require('express')
const router = express.Router()
const {create,login} = require('../controllers/authController')

router.post('/create',create)
router.get('/login',login)

module.exports = router
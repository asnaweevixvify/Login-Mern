const express = require('express')
const router = express.Router()
const {create,login,checkName,updatePass} = require('../controllers/authController')

router.post('/create',create)
router.get('/login',login)
router.get('/checkName/:name',checkName)
router.patch('/updatePass',updatePass)

module.exports = router
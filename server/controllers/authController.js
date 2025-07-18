const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.create = (req,res)=>{
    const userData = req.body
    bcrypt.hash(userData.password,10,(err,hash)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        userData.password = hash
        User.create(userData)
        .then(()=>res.json({msg:'สมัครบัญชีสำเร็จ'}))
        .catch(()=>res.status(400).json({error:'username นี้ถูกใช้งานแล้ว'}))
    })
}

module.exports.login = (req,res)=>{
    const userData = req.query
    const {username,password} = userData
    User.findOne({username})
    .then((data)=>{
        if(!data){
            return res.status(401).json({msg:'ไม่พบชื่อผู้ใช้'})
        }
        else{
            const passwordDb = data.password
            bcrypt.compare(password,passwordDb,(err,result)=>{
                if(err){
                    return res.status(400).json({error:err})
                }
                if(result){
                    const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'})
                    return res.json({msg:'เข้าสู่ระบบสำเร็จ',token})
                }
                else{
                    return res.status(401).json({msg:'รหัสผ่านไม่ถูกต้อง'})
                }
            })
        }
    })
    .catch((err)=>res.status(400).json({error:err}))
}
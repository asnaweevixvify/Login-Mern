import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState,useEffect } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [userData,setUserData] = useState({username:'',password:''})
    const {username,password} = userData
    const [confirmPass,setConfirmPass] = useState('')
    const [isCorrect,setIsCorrect] = useState('blank')
    const navigate = useNavigate()

    const inputValue = (topic)=>{
        return (e) => setUserData({...userData,[topic]:e.target.value})
    }

    const setConfirmPassword = (e)=>{
        setConfirmPass(e.target.value)
    }

    const submitData = (e)=>{
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_APP_API}/api/create`,userData)
        .then((res)=>{
            Swal.fire({
                title: res.data.msg,
                icon: "success",
                draggable: true
              });
              navigate('/login')
        })
        .catch((err)=>{
            Swal.fire({
                icon: "error",
                title: err.response.data.error,
              });
        })
    }

    useEffect(()=>{
        if(confirmPass === password){
            setIsCorrect(true)
        }
        else if(confirmPass === ''){
            setIsCorrect('blank')
        }
        else{
            setIsCorrect(false)
        }
    },[confirmPass])

  return (
    <div className="form-container">
    <h1 className='title'>สร้างบัญชี</h1>
    <form onSubmit={submitData}>
        <h3>username</h3>
        <input type='text' onInput={inputValue('username')}></input>
        <h3>password</h3>
        <input type='text' onInput={inputValue('password')}></input>
        <h3>confirm password</h3>
        <input type='text' onInput={setConfirmPassword}></input>
        {!isCorrect && <p className='confirmPass'>รหัสผ่านไม่ตรงกัน</p>}
        <button type='submit' disabled={!(username&&password&&isCorrect===true)}>สร้างบัญชี</button>
    </form>
    <p>มีบัญชีอยู่แล้ว? <Link to='/login'>เข้าสู่ระบบ</Link></p>
    <p><Link to='/'>กลับไปหน้าหลัก</Link></p>
</div>
  )
}

export default Register
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { authenticate } from '../services/authorize'

function Login({changeStatus}) {
    const [userData,setUserData] = useState({username:'',password:''})
    const {username,password} = userData
    const navigate = useNavigate()

    const inputValue = (topic)=>{
        return (e) => setUserData({...userData,[topic]:e.target.value})
    }

    const submitData = (e)=>{
        e.preventDefault()
        axios.get(`${import.meta.env.VITE_APP_API}/api/login`,{
            params:userData
        })
        .then((res)=>{
            Swal.fire({
                title: res.data.msg,
                icon: "success",
                draggable: true
              });
              authenticate(res)
              changeStatus(true)
              navigate('/')
        })
        .catch((err)=>{
            Swal.fire({
                icon: "error",
                title: err.response.data.msg,
              });
        })
    }

    return (
        <div className="form-container">
            <h1 className='title'>เข้าสู่ระบบ</h1>
            <form onSubmit={submitData}>
                <h3>username</h3>
                <input type='text' onInput={inputValue('username')}></input>
                <h3>password</h3>
                <input type='text' onInput={inputValue('password')}></input>
                <button disabled={!(username&&password)}>เข้าสู่ระบบ</button>
            </form>
            <p>ยังไม่มีบัญชี? <Link to='/register'>สร้างบัญชี</Link></p>
            <div className="des">
                <p><Link to='/findName'>ลืมรหัสผ่าน</Link></p>
                <p><Link to='/'>กลับไปหน้าหลัก</Link></p>
            </div>
        </div>
      )
}

export default Login
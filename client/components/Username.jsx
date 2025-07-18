import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

function Username() {
    const [username,setUsername] = useState('')
    const navigate = useNavigate()

    const inputValue = (e)=>{
        setUsername(e.target.value)
    }

    const checkName = (e)=>{
        e.preventDefault()
        axios.get(`${import.meta.env.VITE_APP_API}/api/checkName/${username}`)
        .then(()=>navigate(`/reset/${username}`))
        .catch((err)=>{
            Swal.fire({
                icon: "error",
                title: err.response.data.msg,
              });
        })
    }

  return (
    <div className="form-container">
            <h1 className='title'>ลืมรหัสผ่าน</h1>
            <form onSubmit={checkName}>
                <h3>กรอก username ของคุณ</h3>
                <input type='text' onInput={inputValue}></input>
                <button type='submit'>หน้าต่อไป</button>
            </form>
        </div>
  )
}

export default Username
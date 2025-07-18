import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

function Reset() {
    const username = useParams().name
    const [isCorrect,setIsCorrect] = useState('blank')
    const [password,setPassword] = useState('')
    const [confirmPass,setConfirmPass] = useState('')
    const navigate = useNavigate()

    const inputValue =(e)=>{
        setPassword(e.target.value)
    }

    const setConfirmPassword = (e)=>{
        setConfirmPass(e.target.value)
    }

    const submitData = (e)=>{
        e.preventDefault()
        axios.patch(`${import.meta.env.VITE_APP_API}/api/updatePass`,{
            username,password
        })
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
        if(confirmPass === password && confirmPass!=='' && password!==''){
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
            <h1 className='title'>Reset password</h1>
            <form onSubmit={submitData}>
                <h3>new password</h3>
                <input type='text' onInput={inputValue}></input>
                <h3>confirm password</h3>
                <input type='text' onInput={setConfirmPassword}></input>
                {!isCorrect && <p className='confirmPass'>รหัสผ่านไม่ตรงกัน</p>}
                <button disabled={!(password&&confirmPass&&isCorrect)}>Reset</button>
            </form>
        </div>
  )
}

export default Reset
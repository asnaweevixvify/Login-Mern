import React from 'react'
import {Link} from 'react-router-dom'
import { getToken,logout } from '../services/authorize'
import Swal from 'sweetalert2'

function Home() {
  const confirmLogout = ()=>{
    Swal.fire({
      title: "ต้องการออกจากระบบหรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ออกจากระบบ",
      cancelButtonText:"ยกเลิก"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'ออกจากระบบสำเร็จ',
          icon: "success"
        });
        logout()
      }
    });
  }
  
  return (
    <div className="home-container">
        <h1 className='title'>Login/Sign-up System</h1>
        <h2>(Mern-Stack)</h2>
        {!getToken()&&<h3>ตอนนี้ ยังไม่ Login ❌</h3>}
        {getToken()&&<h3>ตอนนี้ Login แล้ว ✅</h3>}
        <div className="btn">
            <Link to='/login'><button>เข้าสู่ระบบ</button></Link>
            <Link to='/register'><button>สมัครบัญชี</button></Link>
            <button onClick={confirmLogout}>ออกจากระบบ</button>
        </div>
    </div>
  )
}

export default Home
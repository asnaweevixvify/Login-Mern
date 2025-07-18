import React from 'react'
import {Link} from 'react-router-dom'
import { logout } from '../services/authorize'
import Swal from 'sweetalert2'
import alert from '../services/confirmLogout'

function Home({changeStatus,status}) {
  const confirmLogout = ()=>{
    Swal.fire(alert).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'ออกจากระบบสำเร็จ',
          icon: "success"
        });
        logout()
        changeStatus(false)
      }
    });
  }
  
  return (
    <div className="home-container">
        <h1 className='title'>Login/Sign-up System</h1>
        <h2>(Mern-Stack)</h2>
        {!status &&<h3>ตอนนี้ ยังไม่ Login ❌</h3>}
        {status &&<h3>ตอนนี้ Login แล้ว ✅</h3>}
        <div className="btn">
            <Link to='/login'><button disabled={status}>เข้าสู่ระบบ</button></Link>
            <Link to='/register'><button disabled={status}>สมัครบัญชี</button></Link>
            <button onClick={confirmLogout} disabled={!status}>ออกจากระบบ</button>
        </div>
    </div>
  )
}

export default Home
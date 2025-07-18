import './App.css'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import { BrowserRouter as Router,Route,Link,Routes } from 'react-router-dom'
import { getToken } from '../services/authorize'
import { useState } from 'react'

function App() {
  const [status,setStatus] = useState(!!getToken())

  const changeStatus = (curr)=>{
    setStatus(curr)
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Home changeStatus={changeStatus} status={status}/>}></Route>
        <Route path='/login' element={<Login changeStatus={changeStatus}/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Routes>
    </>
  )
}

export default App

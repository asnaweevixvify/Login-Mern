import './App.css'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import { BrowserRouter as Router,Route,Link,Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Routes>
    </>
  )
}

export default App

import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Login from './login.jsx'
import Register from './register.jsx'
import Profile from './profile.jsx'

/*
IMPORTANTE:
Usar un ID de usuario 'num' es únicamente para el reto, realmente no lo necesitamos en la aplicación.
*/

function App() {
  const [userToken, setUser] = useState('');
  const [userNum, setNum] = useState(0);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login userToken={userToken} setUserToken={setUser} userNum={userNum} setNum={setNum}/>}/>
        <Route path="/login" element={<Login userToken={userToken} setUserToken={setUser} userNum={userNum} setNum={setNum}/>}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/profile" element={<Profile userToken={userToken} userNum={userNum}/>}/>
      </Routes>
    </>
  )
}

export default App

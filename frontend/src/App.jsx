import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import "./Main.css";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Allevemts from './pages/Allevemts';
import PublicLink from './pages/PublicLink';

const App = () => {
 
  const PrivateRoute=({children})=>{
    const token=localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />
  }


  return (
    <>
     <Routes>
      <Route path='/' element={<Navigate to="/login" />} />
      <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
      <Route path='/createevents' element={<PrivateRoute><Events/></PrivateRoute>} />
      <Route path='/allevents' element={<PrivateRoute><Allevemts/></PrivateRoute>} />
      <Route path='/publicevent/:publicId' element={<PublicLink />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login/>} />
     </Routes>
    </>
  )
}

export default App
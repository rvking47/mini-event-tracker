import React, { useEffect, useState } from 'react'
import "../Css/Auth.css";
import { Link } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { TbLockPassword } from 'react-icons/tb';
import { FiLogIn } from 'react-icons/fi';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const base_url="http://localhost:8000";

const Login = () => {
    
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const navigate=useNavigate();

    const handleLogin=async(e)=>{
        try{
            e.preventDefault();
            const response=await axios.post(`${base_url}/api/login`,
                {email,password},{
                    headers:{"Content-Type":"application/json"},
                    validateStatus:()=>true
                });
                if(response.status===201)
                {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    setEmail("");
                    setPassword("");
                    toast.success("Login SuccessFully!!", { duration: 2000 });
                    setTimeout(()=>{
                        navigate("/dashboard");
                    },1000)
                }
                else if(response.status===404)
                {
                    toast.error(response.data.error, { duration: 3000 });
                }
                else if(response.status===401){
                    toast.error(response.data.message, { duration: 3000 });
                }
            }
         catch(err)
               {
              toast.error("Something wrong!!"+ err.message , { duration: 3000 });
            }
    }

    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(token)
        {
            navigate("/dashboard");
        }
    },[]);

  return (
  <>
  <Toaster />
   <div className="container d-flex justify-content-center align-items-center min-vh-100 px-3">
          <div className="content-form bg-white mx-auto border border-gray-100 p-4 rounded-2xl shadow" style={{ maxWidth: '470px', width: '100%' }}>
                <div className="flex justify-center mb-4">
              <div className="bg-blue-100 rounded-full p-4 flex justify-center items-center">
                <FaUserPlus className="text-blue-500 text-2xl" />
              </div>
            </div>
            <div className="title">
              <h2 className="text-center font-black underline mb-4">Login</h2>
            </div>
            <form>
              <div className="form-group mb-4">
                <label className="form-label d-flex align-items-center gap-2"><MdEmail className="text-blue-500" />Email:</label>
                <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="username" />
              </div>
  
              <div className="form-group mb-4">
                <label className="form-label d-flex align-items-center gap-2"><TbLockPassword className="text-blue-500" />Password:</label>
                <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}  autoComplete="current-password" />
              </div>

            <div className="button-submit d-flex justify-content-center mb-3">
            <button className="btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2" onClick={handleLogin}>
            <FiLogIn className="text-white" />Login</button>
             </div>
            </form>
            <div className="text-center mt-3">
              <p className="mb-0">
                Don't have an account{' '}
                <Link to="/signup" className="text-primary fw-bold">
                  Signup
                </Link>
              </p>
            </div>
  
          </div>
        </div>
  </>
  )
}

export default Login
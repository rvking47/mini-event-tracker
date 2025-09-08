import React, { useEffect, useState } from 'react'
import "../Css/Auth.css";
import { Link } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { TbLockPassword } from 'react-icons/tb';
import { FiLogIn } from 'react-icons/fi';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const base_url="https://mini-event-tracker-1.onrender.com";

const Signup = () => {

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirm_password, setConfirmPassword]=useState("");
    const navigate=useNavigate();

const handleSignup=async(e)=>{
        try{
          e.preventDefault();
          const response=await axios.post(`${base_url}/api/signup`,
            {email,password,confirm_password},{
                headers:{"Content-Type":"application/json"},
                validateStatus:()=>true
            });
             if(response.status===201)
             {
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                toast.success("Signup SuccessFully!!" , { duration: 3000 });
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
            <h2 className="text-center font-black underline mb-4">Signup</h2>
          </div>
          <form>
            <div className="form-group mb-4">
              <label className="form-label d-flex align-items-center gap-2"><MdEmail className="text-blue-500" />Email:</label>
              <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="username" />
            </div>

            <div className="form-group mb-4">
              <label className="form-label d-flex align-items-center gap-2"><TbLockPassword className="text-blue-500" />Password:</label>
              <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete="new-password" />
            </div>

            <div className="form-group mb-4">
              <label className="form-label d-flex align-items-center gap-2"><RiLockPasswordFill className="text-blue-500" />Confirm Password:</label>
              <input type="password" className="form-control" value={confirm_password} onChange={(e)=>setConfirmPassword(e.target.value)} autoComplete="new-password" />
            </div>

            <div className="button-submit d-flex justify-content-center mb-3">
                    <button className="btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2" onClick={handleSignup}>
                    <FiLogIn className="text-white" />Signup</button>
                     </div>
          </form>
          <div className="text-center mt-3">
            <p className="mb-0">
              Already have an account?{' '}
              <Link to="/login" className="text-primary fw-bold">
                Login
              </Link>
            </p>
          </div>

        </div>
      </div>
    </>
  )
}

export default Signup


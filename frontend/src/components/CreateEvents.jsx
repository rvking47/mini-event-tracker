import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { FaAlignLeft, FaCalendarPlus, FaHeading, FaMapMarkerAlt, FaRegCalendarAlt, FaTimes } from 'react-icons/fa'

const base_url="https://mini-event-tracker-1.onrender.com";

const CreateEvents = () => {
  
  const [title, setTitle]=useState("");
  const [dateTime, setDates]=useState("");
  const [location, setLocation]=useState("");
  const [description, setDescrbtion]=useState("");

  const handleCreateEvents=async(e)=>{
    e.preventDefault();
        const token = localStorage.getItem("token");
    try{
      const response=await axios.post(`${base_url}/api/event`,
        {title, dateTime, location, description},{
           headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
          validateStatus:()=>true
        });
        if(response.status===201)
        {
           setTitle("");
           setDates("");
           setLocation("");
           setDescrbtion("");
           toast.success("Event Created SuccessFully!!", {duration:2000});
        }
        else if(response.status===404)
        {
          toast.error(response.data.error, {duration:2000})
        }
        else if(response.status===401)
        {
          toast.error(response.data.message, {duration:2000})
        }
    }
    catch(err)
    {
      toast.error(response.data.message, { duration: 3000 });
    }
  }



  return (
    <>
    <div className="countevents bg-gray-500 shadow-sm p-4 rounded" style={{background: 'linear-gradient(to right, #a1c4fd, #c2e9fb)'}}>
  <div className="content-form bg-white-300 mx-auto border border-gray-100 p-4 rounded-2xl shadow" style={{ maxWidth: '470px', width: '100%', backgroundColor:"white" }}>
    <form>
      <div className="title mb-4">
        <h2 className="text-center font-black underline text-black">Create Event</h2>
      </div>

      <div className="form-group mb-3">
        <label className="form-label d-flex align-items-center gap-2">
          <FaHeading className="text-blue-500" /> Event Title:
        </label>
        <input type="text" className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)} />
      </div>
      <div className="form-group mb-3">
        <label className="form-label d-flex align-items-center gap-2">
          <FaRegCalendarAlt className="text-blue-500"/> Date & Time:
        </label>
        <input type="datetime-local" className="form-control" values={dateTime}  onChange={(e)=>setDates(e.target.value)} />
      </div>

      <div className="form-group mb-3">
        <label className="form-label d-flex align-items-center gap-2">
          <FaMapMarkerAlt className="text-blue-500" /> Location:
        </label>
        <input type="text" className="form-control" value={location} onChange={(e)=>setLocation(e.target.value)} />
      </div>

      <div className="form-group mb-3">
        <label className="form-label d-flex align-items-center gap-2">
          <FaAlignLeft className="text-blue-500" /> Description:
        </label>
        <textarea className="form-control" value={description} onChange={(e)=>setDescrbtion(e.target.value)} rows={3} />
      </div>

      <div className="button-submit d-flex justify-content-between gap-2">
        <button className="btn btn-success flex-1 d-flex justify-content-center align-items-center gap-2" onClick={handleCreateEvents}>
          <FaCalendarPlus /> Create Event
        </button>
      </div>
    </form>
  </div>
</div>
    </>
  )
}


export default CreateEvents

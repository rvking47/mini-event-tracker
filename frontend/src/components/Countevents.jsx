import React, { useEffect, useState } from 'react';
import "../Css/Events.css";
import { FcCalendar, FcClock, FcOk } from "react-icons/fc";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const base_url="http://localhost:8000";

const Countevents = () => {
    const [getEvents, setGetevennts]=useState([]);
    const [eventCount, setEventCount]=useState(0);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);

const today= new Date().toLocaleDateString("en-IN",{ weekday: "long", year: "numeric", month: "long", day: "numeric" });

const handleEventCount=async()=>{
    try{
      const token=localStorage.getItem("token");
     const response=await axios.get(`${base_url}/api/allevent`,{
       headers:{Authorization:`Bearer ${token}`},     
        validateStatus:()=>true
     });
     if(response.status===201)
     {
        const events = response.data.result;
        setGetevennts(events);
        setEventCount(events.length);
        const now = new Date();

      const upcoming = events.filter(event => new Date(event.dateTime) > now);
      const past = events.filter(event => new Date(event.dateTime) <= now);

      setUpcomingEvents(upcoming);
      setPastEvents(past);
     }
    }
    catch(err)
    {
        toast.error("Server Error"+ err.message, { duration: 3000 });
    }
}

useEffect(()=>{
   handleEventCount();
},[]);

  return (
    <>
    <Toaster />
    <div className="countevents bg-white shadow-sm p-4 rounded">
      <h2 className="text-center mb-1 text-black">Welcome to Dashboard</h2>
      <p className="d-flex align-items-center justify-content-center text-muted"><FcCalendar className="me-2" /> {today}</p>
<div className="row g-3 mt-3">
  <div className="col-md-4">
    <div className="card shadow-sm p-3 text-center text-white bg-gradient-to-r from-blue-500 to-indigo-500">
      <FcCalendar size={32} className="mb-2" />
      <h5>Total Events</h5>
      <h2>{eventCount}</h2>
    </div>
  </div>
  <div className="col-md-4">
    <div className="card shadow-sm p-3 text-center text-white bg-gradient-to-r from-yellow-400 to-orange-500">
      <FcClock size={32} className="mb-2" />
      <h5>Upcoming</h5>
      <h2>{upcomingEvents.length}</h2>
    </div>
  </div>
  <div className="col-md-4">
    <div className="card shadow-sm p-3 text-center text-white bg-gradient-to-r from-green-400 to-teal-500">
      <FcOk size={32} className="mb-2" />
      <h5>Past</h5>
      <h2>{pastEvents.length}</h2>
    </div>
  </div>
</div>

    </div>
    </>
  )
}

export default Countevents
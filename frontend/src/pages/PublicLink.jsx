import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FcCalendar } from 'react-icons/fc';
import { FcReadingEbook } from 'react-icons/fc';
import { FcFinePrint } from 'react-icons/fc';
import { FcExternal } from 'react-icons/fc';

const base_url = "http://localhost:8000"; 

const PublicLink = () => {
  const { publicId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${base_url}/api/publicevent/${publicId}`, {
          validateStatus: () => true,
        });

        if (res.status === 200) {
          setEvent(res.data); 
        } else {
          toast.error(res.data.message || "Event not found");
        }
      } catch (err) {
        toast.error("Server Error: " + err.message);
      }
    };

    fetchEvent();
  }, [publicId]);

  if (!event) return <p className="text-center mt-5">Loading...</p>;

  return (
<div className="flex justify-center" style={{marginTop:"130px"}}>
  <div className="max-w-md w-full py-4 bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300 text-center">
    {/* Event Title */}
    <h1 className="text-3xl font-extrabold mb-5 text-black underline">
      {event.title}
    </h1>

    {/* Date & Time */}
    <div className="flex items-center justify-center text-gray-700 mb-4">
      <FcCalendar className="text-3xl" />
      <span className="font-medium"> Date & Time:</span>
      <span className="ml-2">{new Date(event.dateTime).toLocaleString()}</span>
    </div>

    {/* Location */}
    <div className="flex items-center justify-center text-gray-700 mb-4">
     <FcExternal className="text-3xl" />
      <span className="font-medium">Location:</span>
      <span className="ml-2">{event.location}</span>
    </div>

    {/* Description */}
    <div className="flex items-start justify-center text-gray-800 mb-4 mx-4">
<FcFinePrint className="text-4xl" />
      <p className="text-left">Description: {event.description}</p>
    </div>

    {/* Owner */}
    <div className="flex items-center justify-center text-black text-sm mt-4">
      <FcReadingEbook  className="text-3xl"/>
      <span>Created by: {event.owner?.email}</span>
    </div>
  </div>
</div>
  );
};

export default PublicLink;

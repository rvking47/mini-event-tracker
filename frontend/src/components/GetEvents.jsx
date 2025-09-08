import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaLink, FaRegClock, FaHistory } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const GetEvents = () => {
  const base_url = "http://localhost:8000";

  const [events, setEvents] = useState([]);   
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [title, setTitle]=useState("");
  const [dateTime, setDates]=useState("");
  const [location, setLocation]=useState("");
  const [description, setDescrbtion]=useState("");
  const navigate=useNavigate();


  const fetchEvents = async (filter = "") => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${base_url}/api/listevent${filter ? `?filter=${filter}` : ""}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          validateStatus: () => true,
        }
      );

      if (response.status === 201) {
        setEvents(response.data.result);
        setFilteredEvents(response.data.result);
      } else {
        toast.error(response.data.message || "Failed to fetch events", { duration: 3000 });
      }
    } catch (err) {
      toast.error("Server Error: " + err.message, { duration: 3000 });
    }
  };


  const handleDelet=async(id)=>{
    try{
      const token = localStorage.getItem("token");
      const response=await axios.delete(`${base_url}/api/dlevent/${id}`,{
        headers:{Authorization: `Bearer ${token}`}
      });
      if(response.status===201)
      {
        fetchEvents();
        toast.success("Event Deleted SuccessFully!!", { duration: 2000 });
      }
    }
    catch(err)
    {
      toast.error("Server Error: " + err.message, { duration: 3000 });
    }
  }

//modal

const handleEditClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };


//updates

const handleUpdate=async(id, updatedEvent)=>{
  try{
      const token = localStorage.getItem("token");
    const response=await axios.put(`${base_url}/api/upevent/${id}`,
       updatedEvent,{
           headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        validateStatus:()=>true
  });
   if(response.status===201)
        {
           setShowModal(false);
           fetchEvents();
           toast.success("Event Updated SuccessFully!!", {duration:2000});
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
    toast.error("Server Error: " + err.message, { duration: 3000 });
  }
}


  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
    <Toaster />
    <div className="countevents bg-gray-500 shadow-sm p-4 rounded">
      <h2 className="text-center mb-4 text-black">All Events</h2>

      <div className="d-flex justify-content-between gap-2 mb-4">
        <button
          className="btn btn-primary flex-1 d-flex justify-content-center align-items-center gap-2"
          onClick={() => fetchEvents("")} // All events
        >
          <FaRegClock /> All Events
        </button>

        <button
          className="btn btn-danger flex-1 d-flex justify-content-center align-items-center gap-2"
          onClick={() => fetchEvents("upcoming")} // Upcoming events
        >
          <FaRegClock /> Upcoming Events
        </button>

        <button
          className="btn btn-secondary flex-1 d-flex justify-content-center align-items-center gap-2"
          onClick={() => fetchEvents("past")} // Past events
        >
          <FaHistory /> Past Events
        </button>
      </div>

      {/* Events Table */}
      <div className="table-responsive shadow rounded bg-white">
        <table className="table table-hover mb-0">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Date & Time</th>
              <th>Location</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event, index) => (
              <tr key={event._id || index}>
                <td>{index + 1}</td>
                <td>{event.title}</td>
                <td>{new Date(event.dateTime).toLocaleString()}</td>
                <td>{event.location}</td>
                <td>{event.description}</td>
                <td className="d-flex gap-2">
                         <button
                  className="btn btn-sm btn-primary d-flex align-items-center gap-1"
                  onClick={() => handleEditClick(event)}>
                  <FaEdit /> Edit
                </button>
                  <button className="btn btn-sm btn-danger d-flex align-items-center gap-1" onClick={()=>handleDelet(event._id)}>
                    <FaTrash /> Delete
                  </button>
                <button
                className="btn btn-sm btn-info d-flex align-items-center gap-1"
                onClick={() => navigate(`/publicevent/${event.publicId}`)}
                 >
      <FaLink /> Link
    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
              {/* Modal */}
      {showModal && (
        <div className="modal-backdrop fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Event</h2>

            <div className="mb-2">
              <label className="block mb-1">Title:</label>
              <input
                type="text"
                className="form-control"
                value={selectedEvent.title}
                onChange={(e) =>
            setSelectedEvent({ ...selectedEvent, title: e.target.value })
          }
              />
            </div>
               <div className="mb-2">
              <label className="block mb-1">Date & Time:</label>
              <input
                type="datetime-local"
                className="form-control" 
                 onChange={(e) =>
            setSelectedEvent({ ...selectedEvent, dateTime: e.target.value })
          }
              />
            </div>
            <span>{new Date(selectedEvent.dateTime).toLocaleString()}</span>

               <div className="mb-2">
              <label className="block mb-1">Location:</label>
              <input
                type="text"
                className="form-control"
                value={selectedEvent.location}
                onChange={(e) =>
            setSelectedEvent({ ...selectedEvent, location: e.target.value })
          }
              />
            </div>

            <div className="mb-2">
              <label className="block mb-1">Description:</label>
              <textarea
                className="form-control"
                rows={3}
                value={selectedEvent.description}
                onChange={(e) =>
            setSelectedEvent({ ...selectedEvent, description: e.target.value })
          }
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button className="btn btn-secondary" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={()=>handleUpdate(selectedEvent._id, selectedEvent)}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
    

    </>
  );
};

export default GetEvents;

import React from "react";
import { FaRegCalendarAlt, FaMapMarkerAlt, FaLink } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cards = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div className="card shadow-md rounded-xl border p-4 bg-white hover:shadow-lg transition-all">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>

      <div className="flex items-center text-sm text-gray-600 mb-2">
        <FaRegCalendarAlt className="mr-2 text-blue-500" />
        {new Date(event.dateTime).toLocaleString()}
      </div>
      <div className="flex items-center text-sm text-gray-600 mb-3">
        <FaMapMarkerAlt className="mr-2 text-red-500" />
        {event.location}
      </div>

      <p className="text-gray-700 text-sm mb-4">{event.description}</p>

      {/* Navigate to frontend public page */}
      <button
        className="btn btn-sm btn-info d-flex align-items-center gap-2"
        onClick={() => navigate(`/publicevent/${event.publicId}`)}
      >
        <FaLink /> Open Public Page
      </button>
    </div>
  );
};

export default Cards;

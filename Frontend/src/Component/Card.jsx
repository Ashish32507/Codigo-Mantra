import React from "react";
import { useNavigate } from "react-router-dom";
import AddComment from "./AddComment";

function Card({ title, description, tag, id }) {
  const handleShareByEmail = () => {
    const subject = `Check out this post: ${title}`;
    const body = `${title}\n\n${description}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const tags = tag ? tag.split(",").map((t) => t.trim()) : [];
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-sm mx-auto">
      {/* Display tags */}
      <div className="mb-2 flex flex-wrap gap-2">
        {tags.length > 0 ? (
          tags.map((individualTag, index) => (
            <span
              key={index}
              className="text-xs font-semibold text-blue-600 uppercase bg-blue-100 px-2 py-1 rounded-full"
            >
              {individualTag}
            </span>
          ))
        ) : (
          <span className="text-xs font-semibold text-gray-400">No tags</span>
        )}
      </div>

      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="mt-2 text-gray-600">{description}</p>

      {/* Action buttons */}
      <div className="mt-4 flex space-x-4">
        <button
          className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
          onClick={() => navigate(`/details/${id}`)}
        >
          View Details
        </button>
        <button
          className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
          onClick={handleShareByEmail}
        >
          Share by Email
        </button>
      </div>
    </div>
  );
}

export default Card;

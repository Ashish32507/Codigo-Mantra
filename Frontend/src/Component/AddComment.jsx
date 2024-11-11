import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddComment = ({ id }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    const commentData = {
      userId: user._id,
      comment: comment,
    };

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `http://localhost:4000/comment/new/${id}`,
        commentData
      );

      if (response.data.success) {
        setComment("");
        toast.success("Comment added successfully!");
        navigate("/");
      }
    } catch (err) {
      setError("Failed to add comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Add a Comment</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
      {/* Display error if any */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            required
            rows="4"
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !comment}
          className={`w-full py-2 bg-blue-500 text-white rounded-md ${
            loading || !comment
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          {loading ? "Adding..." : "Add Comment"}
        </button>
      </form>
    </div>
  );
};

export default AddComment;

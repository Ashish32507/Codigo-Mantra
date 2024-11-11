import React, { useEffect, useState } from "react";
import axios from "axios";

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch comments from the API
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/comment/allcomment/${id}`
        );
        setComments(response.data.comments || []);
      } catch (error) {
        setError("No Comment Found");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [id]); // Depend on the 'id' prop so it fetches the comments when the post id changes

  return (
    <div className="max-w-7xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      {loading ? (
        <p className="text-gray-500">Loading comments...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-white shadow-lg p-6 rounded-lg border border-gray-200 hover:shadow-xl transition duration-200"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="font-semibold text-lg text-blue-600">
                    {comment.userId.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {comment.createdAt.slice(0, 10)}
                  </div>
                </div>
                <p className="text-gray-800">{comment.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;

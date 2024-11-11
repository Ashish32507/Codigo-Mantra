import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comments from "./Comment";
import AddComment from "./AddComment";
import { useSelector } from "react-redux";
import store from "../redux/Store";

function DetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((store) => store.user);
  console.log(id);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/blog/${id}`);
        setPost(response.data.posts);
        console.log(response.data);
      } catch (err) {
        setError("Error fetching post details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Handle the tags (split by comma)
  const tags = post?.tag ? post.tag.split(",").map((t) => t.trim()) : [];

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Display the title */}
        <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>

        {/* Display the description */}
        <p className="mt-4 text-lg text-gray-700">{post.description}</p>

        {/* Display the tags */}
        <div className="mt-6 mb-4 flex flex-wrap gap-2">
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
      </div>
      {user && <AddComment id={id} />}

      <Comments id={id} />
    </div>
  );
}

export default DetailPage;

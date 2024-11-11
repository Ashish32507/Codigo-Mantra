import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import jsCookie from "js-cookie";
import { useNavigate } from "react-router-dom";

// MainCard Component to fetch and render all posts
function UserPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = jsCookie.get("token"); // Read the auth token from the cookie
        // If no token is found, redirect to the login page
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:4000/blog/userpost",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in the request header
            },
          }
        );
        setPosts(response.data.posts || []);
        console.log(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-8 p-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card
              key={post._id} // assuming each post has a unique '_id' field
              title={post.title}
              id={post._id}
              description={post.description}
              tag={post.tag}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserPost;

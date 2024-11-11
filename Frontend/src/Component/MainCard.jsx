import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

function MainCard() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]); // For storing filtered posts
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [searchQuery, setSearchQuery] = useState(""); // For the search input
  const [filterType, setFilterType] = useState("both"); // To track the selected filter type ('title', 'tag', 'both')
  const postsPerPage = 5; // Maximum posts per page

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/blog/allpost");
        setPosts(response.data.posts || []);
        setFilteredPosts(response.data.posts || []); // Initially display all posts
        console.log(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter posts based on search query and selected filter type
  useEffect(() => {
    const filtered = posts.filter((post) => {
      const title = post.title || ""; // Fallback to empty string if title is undefined
      const tag = post.tag || ""; // Fallback to empty string if tag is undefined

      const titleMatch = title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const tagMatch = tag.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter based on selected filter type ('title', 'tag', or 'both')
      if (filterType === "title") {
        return titleMatch;
      } else if (filterType === "tag") {
        return tagMatch;
      } else {
        // For 'both', match either title or tag
        return titleMatch || tagMatch;
      }
    });

    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when search or filter changes
  }, [searchQuery, filterType, posts]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="max-w-7xl mx-auto mt-8 p-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Filter Dropdown and Search Input */}
          <div className="flex mb-4 space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="both">Both Title and Tag</option>
              <option value="title">Title</option>
              <option value="tag">Tag</option>
            </select>

            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {currentPosts.map((post) => (
              <Card
                key={post._id}
                title={post.title}
                id={post._id}
                description={post.description}
                tag={post.tag}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            <button
              className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            >
              Previous
            </button>
            <span className="flex items-center justify-center text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MainCard;

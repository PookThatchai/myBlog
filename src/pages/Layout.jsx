import React, { useState, useEffect } from "react";
import Content from "../pages/Content";

const Layout = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4444/createpost")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <>
      <h1 className="text-4xl font-extrabold text-center">DAILY POST</h1>
      <div className="container mx-auto px-4 py-6">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <Content key={post.id || index} post={post} />
          ))
        ) : (
          <p className="text-center text-lg text-gray-500">Loading posts...</p>
        )}
      </div>
    </>
  );
};

export default Layout;

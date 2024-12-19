import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";

const PostPage = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const { data } = useContext(UserContext);

  useEffect(() => {
    if (data) {
      console.log("Current User from Context:", data);
      setCurrentUser(data);
    } else {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (user) {
        console.log("Current User from localStorage:", user);
        setCurrentUser(user);
      } else {
        console.log("No user found in localStorage.");
      }
    }
  }, [data]);

  useEffect(() => {
    fetch(`http://localhost:4444/createpost/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Post Info:", data);
        setPostInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching post data:", error);
      });
  }, [id]);

  if (!postInfo) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading...
      </div>
    );
  }

  console.log("Current User ID:", currentUser?.id);
  console.log("Post Author ID:", postInfo?.author?._id);

  return (
    <div className="flex flex-col items-center px-4 py-8 w-full">
      <div className="text-center mb-4">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800">
          {postInfo.title}
        </h1>
        <div className="mt-2 text-gray-600">
          {postInfo.author ? postInfo.author.username : "Unknown Author"}
          {currentUser &&
            postInfo.author &&
            String(currentUser.id) === String(postInfo.author._id) && (
              <div className="mt-4">
                <Link
                  to={`/edit/${postInfo._id}`}
                  className=" mt-2 text-1xl bg-slate-900 px-6 py-2 w-24 mx-auto text-center"
                >
                  <a href={`/edit/${id}`} className="p-1 rounded-lg text-white">
                    Edit
                  </a>
                </Link>
              </div>
            )}
        </div>
      </div>
      <div className="mb-8 w-full max-w-4xl">
        <img
          className="rounded-lg shadow-lg w-full max-h-96 object-cover"
          src={postInfo.cover}
          alt={postInfo.title}
        />
      </div>
      <p className="text-base md:text-lg lg:text-2xl text-gray-700 text-center mb-8 px-4 leading-relaxed">
        {postInfo.summary}
      </p>
      <div
        className=" prose prose-lg md:prose-xl text-gray-800 rounded-lg bg-white p-6 w-full shadow-lg"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      ></div>
    </div>
  );
};

export default PostPage;

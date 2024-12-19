import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom"; // ใช้ useNavigate แทน Navigate
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["link"],
    ["image"],
    ["blockquote"],
    [{ align: [] }],
    [{ direction: "rtl" }],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "link",
  "image",
  "blockquote",
  "align",
  "direction",
  "clean",
];

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate(); // ใช้ useNavigate

  const handleSubmitNewPost = async (e) => {
    e.preventDefault();

    if (!files || files.length === 0) {
      alert("Please select a file.");
      return;
    }

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found, please log in.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/createpost`,
        {
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        const postId = result._id;
        setRedirect(true);
        alert("Created new post");
        navigate(`/post/${postId}`);
      } else {
        const errorData = await response.json();
        alert("Failed to create post. Error: " + errorData.message);
      }
    } catch (error) {
      alert("Error during post creation. Please try again.");
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-50">
      <h1 className="text-center text-4xl mt-10 pt-10">
        Let's create new post
      </h1>
      <form
        onSubmit={handleSubmitNewPost}
        className="flex flex-col justify-center items-center mt-10 space-y-6 w-full px-4"
      >
        <input
          className="border-2 border-black p-3 w-full sm:w-2/3 md:w-1/2 rounded-lg text-lg"
          type="text"
          placeholder={"Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border-2 border-black p-3 w-full sm:w-2/3 md:w-1/2 rounded-lg text-lg"
          type="text"
          placeholder={"Summary"}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input
          className="border-2 border-black p-3 w-full sm:w-2/3 md:w-1/2 rounded-lg text-lg"
          type="file"
          onChange={(e) => setFiles(e.target.files)}
        />
        <div className="w-full sm:w-2/3 md:w-1/2 mb-6">
          <ReactQuill
            modules={modules}
            formats={formats}
            className="h-64 rounded-lg"
            value={content}
            onChange={(newValue) => setContent(newValue)}
          />
        </div>
        <div className="p-2"></div>
        <div className="flex justify-center w-full sm:w-2/3 md:w-1/2 mt-4">
          <button className="bg-slate-900 text-2xl text-white py-3 px-6 rounded-lg hover:bg-slate-300 hover:text-black transition duration-300 w-full">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;

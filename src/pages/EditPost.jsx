import React, { useState, useEffect } from "react"; // เพิ่มการ import useEffect
import Editer from "../components/Editer"; // ตรวจสอบว่า Editer ถูกต้องตามที่ต้องการ
import { Navigate, useParams } from "react-router-dom"; // นำเข้า Navigate และ useParams

const EditPost = () => {
  const { id } = useParams(); // ใช้ useParams เพื่อดึง id จาก URL
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [cover, setCover] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4444/cratepost/${id}`)
      .then((response) => response.json())
      .then((postInfo) => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
        setCover(postInfo.cover);
      })
      .catch((error) => console.error("Error fetching post:", error));
  }, []);

  const handleUpdatePost = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (files) {
      data.set("file", files[0]);
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found, please log in.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4444/cratepost/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        setRedirect(true);
        alert("Post updated successfully");
      } else {
        const errorData = await response.json();
        alert("Failed to update post. Error: " + errorData.message);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("Error during post update. Please try again.");
    }
  };

  if (redirect) {
    return <Navigate to={`/createpost/${id}`} />;
  }

  return (
    <div className="w-screen h-screen bg-slate-50">
      <h1 className="text-center text-4xl mt-10 pt-10">Let's edit your post</h1>
      <form
        onSubmit={handleUpdatePost}
        className="flex flex-col justify-center items-center mt-10 space-y-6 w-full px-4"
      >
        <input
          className="border-2 border-black p-3 w-full sm:w-2/3 md:w-1/2 rounded-lg text-lg"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border-2 border-black p-3 w-full sm:w-2/3 md:w-1/2 rounded-lg text-lg"
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input
          className="border-2 border-black p-3 w-full sm:w-2/3 md:w-1/2 rounded-lg text-lg"
          type="file"
          onChange={(e) => setFiles(e.target.files)}
        />
        <div className="w-full sm:w-2/3 md:w-1/2 mb-6">
          <Editer value={content} onChange={setContent} />
        </div>
        <div className="p-2"></div>
        <div className="flex justify-center w-full sm:w-2/3 md:w-1/2 mt-4">
          <button className="bg-slate-900 text-2xl text-white py-3 px-6 rounded-lg hover:bg-slate-300 hover:text-black transition duration-300 w-full">
            Update post
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;

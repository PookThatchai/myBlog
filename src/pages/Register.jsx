import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ฟังก์ชันที่ทำงานเมื่อ Submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // หยุดการรีเฟรชหน้า
    const response = await fetch("http://localhost:4444/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status !== 200) {
      alert("register failed");
    } else {
      alert("register completed");
    }
  };

  return (
    <>
      <div className="flex mx-20 gap-20 mt-5">
        <img
          className="w-3/4 h-screen"
          src="https://www.akerufeed.com/wp-content/uploads/2019/09/1-18.jpg"
        />
        <div className="flex flex-col gap-10 w-1/2 justify-center ">
          <h1 className="text-5xl text-center">Register Here</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 justify-center items-center "
          >
            <input
              className="p-5 border-2 border-black w-1/2 rounded-lg"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="p-5 border-2 border-black w-1/2 rounded-lg"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="p-5 border-2 border-black w-1/2 rounded-lg text-2xl"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

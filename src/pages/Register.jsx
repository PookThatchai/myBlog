import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/register`,
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem("token", result.token);
      navigate("/");
    } else {
      const errorData = await response.json();
      alert("Error: " + errorData.message);
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-50">
      <h1 className="text-center text-4xl mt-10 pt-10">Register</h1>
      <form
        onSubmit={handleRegister}
        className="flex flex-col justify-center items-center mt-10 space-y-6 w-full px-4"
      >
        <input
          className="border-2 border-black p-3 w-full sm:w-2/3 md:w-1/2 rounded-lg text-lg"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border-2 border-black p-3 w-full sm:w-2/3 md:w-1/2 rounded-lg text-lg"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="border-2 border-black p-3 w-full sm:w-2/3 md:w-1/2 rounded-lg text-lg"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="p-2"></div>
        <div className="flex justify-center w-full sm:w-2/3 md:w-1/2 mt-4">
          <button className="bg-slate-900 text-2xl text-white py-3 px-6 rounded-lg hover:bg-slate-300 hover:text-black transition duration-300 w-full">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

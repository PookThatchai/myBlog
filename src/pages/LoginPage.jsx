import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [direction, setDirection] = useState(false);
  const { setData } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      // Save user data in UserContext and localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ username, id: data.id })
      ); // Store user data
      setData({ username, id: data.id }); // Store user data in Context
      setDirection(true);
    } else {
      alert("Wrong information");
    }
  };

  if (direction) {
    return <Navigate to={`/`} />;
  }

  return (
    <>
      <div className="flex mx-20 gap-20 mt-5">
        <img
          className="w-3/4 h-screen"
          src="https://www.akerufeed.com/wp-content/uploads/2019/09/1-18.jpg"
          alt="Login"
        />
        <div className="flex flex-col gap-10 w-1/2 justify-center ">
          <h1 className="text-5xl text-center">Login Here</h1>
          <form
            className="flex flex-col gap-2 justify-center items-center"
            onSubmit={handleLogin}
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
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

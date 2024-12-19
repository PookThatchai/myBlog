import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext"; // ใช้ UserContext ที่เป็น context

const Navbar = () => {
  const { setData, data } = useContext(UserContext); // ใช้ UserContext ที่เป็น context
  const navigate = useNavigate();

  // ใช้ useEffect เพื่อตรวจสอบการมีอยู่ของ token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:4444/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch profile");
          }
          return response.json();
        })
        .then((data) => {
          setData(data); // ตั้งค่า context เมื่อได้รับข้อมูลจาก API
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    } else {
      setData(null); // หากไม่มี token จะตั้งค่า context เป็น null
    }
  }, [setData]); // useEffect จะทำงานครั้งเดียวตอนที่ component ถูก mount

  const handleLogout = () => {
    localStorage.removeItem("token");
    setData(null); // ลบข้อมูลผู้ใช้ใน context
    navigate("/login");
  };

  return (
    <header className="flex justify-between mt-5">
      <Link to="/" className="font-bold text-2xl ml-20">
        MyBlog
      </Link>
      <nav className="flex gap-10 mr-20 text-2xl">
        {data && data.username ? ( // ตรวจสอบ data และ username
          <>
            <Link to="/createpost">Posting</Link>
            <a onClick={handleLogout}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login" className="text-2xl">
              Login
            </Link>
            <Link to="/register" className="text-2xl">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

import React, { createContext, useState } from "react";

// สร้าง context
export const UserContext = createContext();

// UserContextProvider สำหรับการให้ค่า context
function UserContextProvider({ children }) {
  const [data, setData] = useState(null);

  return (
    <UserContext.Provider value={{ data, setData }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;

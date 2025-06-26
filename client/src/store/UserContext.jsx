import { createContext, useContext, useState } from "react";
import { loginUser } from "../services/api";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // התחברות/הרשמה
  const login = async (name, phone) => {
    const res = await loginUser(name, phone);
    setUser(res.data);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
import { createContext, useContext, useEffect, useState } from "react";
import { getUserById } from "../api/users";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user on refresh
  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid) fetchUser(uid);
  }, []);

  async function fetchUser(id) {
    const res = await getUserById(id);
    if (res) setUser(res);
  }

  function loginUser(u) {
    setUser(u);
    localStorage.setItem("uid", u.id);
  }

  function logoutUser() {
    setUser(null);
    localStorage.removeItem("uid");
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

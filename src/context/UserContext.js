
import { useState, useContext, createContext, useEffect } from "react";
const UserContext = createContext();

export default function UserContextWrapper({ children }) {
  const [User, setUser] = useState({});
  const userdata = localStorage.getItem('User');

  useEffect(() => {
    try {
      setUser(userdata);
    } catch (err) {
      console.log(err);
    }
  }, [userdata])


  return (
    <UserContext.Provider value={{ User }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContextWrapper() {
  const { User } = useContext(UserContext);
  return User?.toString();
}
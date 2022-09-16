
import { useState, useContext, createContext } from "react";
const UserContext = createContext();

export default function UserContextWrapper({ children }) {
  const [User, setUser] = useState({});
 

  return (
    <UserContext.Provider value={[User, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContextWrapper() {
  const { User } = useContext(UserContext);
  return User?.toString();
}
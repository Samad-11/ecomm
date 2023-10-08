import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      const parsedDate = JSON.parse(localStorage.getItem("auth"));
      setAuth({ ...auth, user: parsedDate.user, token: parsedDate.token });
    }
    // eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

//custom hook

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

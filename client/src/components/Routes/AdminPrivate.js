import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const AdminPrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  console.log(auth.token);

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        "http://localhost:8080/api/v1/auth/admin-auth",
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      console.log("testingggggggggggg", res.data);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth.token) authCheck();
  }, [auth.token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default AdminPrivateRoute;

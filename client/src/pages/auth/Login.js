import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import watchImg from "../../images/login-img.jpeg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../contexts/authContext";
import { SEO } from "../../components/SEO";

const Login = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          email: credentials.email,
          password: credentials.password,
        }
      );
      console.log(response.data);
      if (response.data.success === true) {
        toast.success("Login Successful");
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...auth,
            user: response.data.user,
            token: response.data.token,
          })
        );
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Internal Server Error");
      console.log(error);
    }
  };

  return (
    <Layout>
      <SEO title={"Login Here"} />
      <h3 className="text-end text-secondary mb-4 p-1">Login</h3>
      <div className="container mb-2">
        <div className="row p-4" style={{ border: "2px solid gray" }}>
          <div className="col-md-6 mb-5">
            <figure
              className="w-100 d-flex justify-content-center
"
            >
              <img
                src={watchImg}
                alt="watch"
                style={{ maxHeight: "80vh" }}
                className="object-fit "
              />
            </figure>
          </div>
          <form
            onSubmit={handleClick}
            className="col-md-5 col-sm-9 col-xs-6 mx-auto mb-5 p-5"
          >
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
              />
            </div>

            <button type="submit" className="btn btn-primary mt-2">
              Login
            </button>
            <Link to={"/register"} className="ms-5">
              New User
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

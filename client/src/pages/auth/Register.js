import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import watchImg from "../../images/registration-img.jpeg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { SEO } from "../../components/SEO";

const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          name: credentials.name,
          email: credentials.email,
          phone: credentials.phone,
          password: credentials.password,
        }
      );
      if (response.data.success === true) {
        navigate("/login");
        toast.success("Registration Successful Please Login Now");
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
      <SEO title={"Register-User"} />
      <h3 className="text-end text-secondary mb-4 p-1">Register</h3>
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
            className="col-md-5 col-sm-9 col-xs-6 m-auto mb-5 p-5"
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={credentials.name}
                onChange={onChange}
              />
            </div>
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
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Mobile
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={credentials.phone}
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
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkbox"
              />
              <label className="form-check-label" htmlFor="checkbox">
                Confirm Privacy Policy
              </label>
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              Register
            </button>
            <Link to={"/login"} className="ms-5">
              Already Registered ®
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;

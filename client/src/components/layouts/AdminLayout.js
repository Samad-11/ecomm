import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import toast from "react-hot-toast";

const AdminLayout = ({ children }) => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-secondary navbar-dark row">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Ronics
          </Link>
          <div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <p className="nav-link">Hello Admin</p>
                </li>
                <li className="nav-item  dropdown ">
                  <button
                    className="dropdown-toggle nav-link"
                    style={{ background: "transparent", border: "none" }}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></button>
                  <ul className="dropdown-menu dropdown-menu-dark  dropdown-menu-end">
                    <>
                      <li className="dropdown-item">
                        <NavLink
                          onClick={() => {
                            setAuth({ token: "", user: "null" });
                            localStorage.clear();
                            toast.success("Logout Successful");
                          }}
                          className="nav-link"
                          to="/login"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <hr />
      <div className="row">
        <div className="col-md-2">
          <ul className="list-group">
            <li className="list-group-item " aria-current="true">
              <NavLink
                to={"/dashboard/admin/category"}
                className="text-dark text-decoration-none fs-3"
              >
                Category
              </NavLink>
            </li>
            <li className="list-group-item " aria-current="true">
              <NavLink
                to={"/dashboard/admin/product"}
                className="text-dark text-decoration-none fs-3"
              >
                Product
              </NavLink>
            </li>
            <li className="list-group-item " aria-current="true">
              <NavLink
                to={"/dashboard/admin/users"}
                className="text-dark text-decoration-none fs-3"
              >
                User
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="col-md-10">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;

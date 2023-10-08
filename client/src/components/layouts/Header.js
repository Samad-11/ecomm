import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { toast } from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({ name: null, token: "" });

    localStorage.removeItem("auth");
    toast.success("Logout Successful");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-secondary navbar-dark">
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
                  <NavLink className="nav-link" aria-current="page" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/category">
                    Category
                  </NavLink>
                </li>
                {!auth.token ? (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/register">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login">
                        Login
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink
                        onClick={handleLogout}
                        className="nav-link"
                        to="/login"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </>
                )}

                <li className="nav-item">
                  <NavLink className="nav-link" to="/cart">
                    cart(0)
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <hr />
    </>
  );
};

export default Header;

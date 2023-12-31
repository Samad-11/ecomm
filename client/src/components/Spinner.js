import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    if (count === 1) {
      navigate("/login");
      clearInterval(interval);
    }
  }, [count, navigate]);
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center "
        style={{ minHeight: "100vh" }}
      >
        <div className="spinner-border" role="status"></div>
        <h2>Redirecting you in {count} sec</h2>
      </div>
    </>
  );
};

export default Spinner;

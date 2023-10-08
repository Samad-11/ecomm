import React from "react";
import Layout from "../components/layouts/Layout";
import { useAuth } from "../contexts/authContext";

const Home = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout>
      <h1>Home</h1>
      <pre>{JSON.stringify(auth)}</pre>
    </Layout>
  );
};

export default Home;

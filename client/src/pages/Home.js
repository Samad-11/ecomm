import React from "react";
import Layout from "../components/layouts/Layout";
import { useAuth } from "../contexts/authContext";
import { SEO } from "../components/SEO";

const Home = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout>
      <SEO title={"Ronics-Home"} />
      <h1>Home</h1>
      <pre>{JSON.stringify(auth)}</pre>
    </Layout>
  );
};

export default Home;

import React from "react";
import Layout from "../../components/layouts/Layout";
import { SEO } from "../../components/SEO";
import { useAuth } from "../../contexts/authContext";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <SEO title={auth?.user?.name + " | Profile"} />
      <h1>Dashboard</h1>
    </Layout>
  );
};

export default Dashboard;

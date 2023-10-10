import React from "react";
import Layout from "../components/layouts/Layout";
import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
const NotFound = () => {
  return (
    <Layout>
      <SEO title={"Error-404 | NOT FOUND"} />
      <section className="pnf">
        <h1>404</h1>
        <h4>Page Not Found ❌ </h4>
        <Link to={"/"} className="btn btn-secondary btn-lg my-5">
          Go Back
        </Link>
      </section>
    </Layout>
  );
};

export default NotFound;

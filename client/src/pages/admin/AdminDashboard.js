import React from "react";
// import Layout from "../../components/layouts/Layout";
import { SEO } from "../../components/SEO";
import AdminLayout from "../../components/layouts/AdminLayout";

const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <AdminLayout>
        <SEO title={"Admin-Dashboard | Ronics"} />
        <h2 className="text-center">Admin Panel</h2>
      </AdminLayout>
    </div>
  );
};

export default AdminDashboard;

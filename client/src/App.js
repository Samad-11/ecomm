import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import { HelmetProvider } from "react-helmet-async";
import AdminPrivateRoute from "./components/Routes/AdminPrivate";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminUsers from "./pages/admin/AdminUsers";

function App() {
  return (
    <>
      <HelmetProvider>
        <Toaster />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/dashboard" Component={PrivateRoute}>
            <Route path="/dashboard/user" Component={Dashboard} />
          </Route>
          <Route path="/dashboard" Component={AdminPrivateRoute}>
            <Route path="/dashboard/admin" Component={AdminDashboard} />
            <Route path="/dashboard/admin/category" Component={AdminCategory} />
            <Route path="/dashboard/admin/product" Component={AdminProduct} />
            <Route path="/dashboard/admin/users" Component={AdminUsers} />
          </Route>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/about" Component={About} />
          <Route path="/contact" Component={Contact} />
          <Route path="/*" Component={NotFound} />
        </Routes>
      </HelmetProvider>
    </>
  );
}

export default App;

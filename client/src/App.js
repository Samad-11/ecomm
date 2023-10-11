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

function App() {
  return (
    <>
      <HelmetProvider>
        <Toaster />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/user-dashboard" Component={PrivateRoute}>
            <Route path="" Component={Dashboard} />
          </Route>
          <Route path="admin-dashboard" Component={AdminPrivateRoute}>
            <Route path="" Component={AdminDashboard} />
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

import React, { useState, useEffect } from "react";
import Hero from "./components/HomePage/Hero";
import Pricing from "./components/PricingPage/Pricing";
import About from "./components/AboutPage/About";
import Login from "./components/LoginPage/Login.jsx";
import SignUp from "./components/SignUp Page/SignUp.jsx";
import Navbar from "./components/partial/Navbar";
import Footer from "./components/partial/Footer";
import Admin from "./components/AdminPage/Admin.jsx";
import InterviewPrep from "./components/InterviewPrep/InterviewPrep.jsx";
import Evaluate from "./components/InterviewPrep/Evaluate.jsx";

import { Toaster, toast } from "react-hot-toast";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  // Function to check session on initial load
  const checkSession = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch("http://localhost:5000/api/check-session", {
        credentials: "include", // Ensure cookies are sent with the request
      });
      const data = await response.json();
      console.log("Session data:", data); // Log the response data
      setIsLoggedIn(data.isLoggedIn);
      setIsAdmin(data.isAdmin); // Assuming your API provides isAdmin
    } catch (error) {
      console.error("Error checking session:", error);
      setIsLoggedIn(false);
      setIsAdmin(false);
    } finally {
      setLoading(false); // End loading after session check
    }
  };

  // Call checkSession when the component mounts
  useEffect(() => {
    checkSession();
  }, []);

  const handleLogin = () => {
    checkSession();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    try {
      setIsLoggedIn(false);
      checkSession(); // Refresh the session state
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const AdminRoute = () => {
    console.log("isLoggedIn:", isLoggedIn);  // Log the current state
    console.log("isAdmin:", isAdmin);        // Log the current state

    if (loading) {
      // Show a loading spinner or message while checking session
      return <div>Loading...</div>;
    }

    if (isAdmin) {
      return <Admin />;
    }
    return <Navigate to="/" />; // Redirect if not admin
  };

  return (
    <Router>
      <div>
        <Toaster />
        {/* Define Routes */}
        <div className="relative flex flex-col h-screen">
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} isAdmin={isAdmin} />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/aboutus" element={<About />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/interviewprep" element={<InterviewPrep />} />
            <Route path="/admin" element={<AdminRoute />} />
            <Route path="/interviewprep/evaluate" element={<Evaluate />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;

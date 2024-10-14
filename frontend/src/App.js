import React, { useState } from "react";
import Hero from "./components/HomePage/Hero";
import Pricing from "./components/PricingPage/Pricing";
import About from "./components/AboutPage/About";
import Login from "./components/LoginPage/Login.jsx";
import SignUp from "./components/SignUp Page/SignUp.jsx";
import Navbar from "./components/partial/Navbar";
import Footer from "./components/partial/Footer";


//import logo from './logo.svg';
import { Toaster } from "react-hot-toast";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <Router>
      <div>
        <Toaster />
        {/* Define Routes */}
        <div className="relative flex flex-col h-screen">
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <Routes>
            <Route path="/home" element={<Hero />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/aboutus" element={<About />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;

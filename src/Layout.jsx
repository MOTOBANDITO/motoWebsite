// src/Layout.jsx

import React, { useState, useEffect } from "react";
// --- 1. Import useLocation from react-router-dom ---
import { Outlet, Link, useLocation } from "react-router-dom";
import "./App.css";

function Layout() {
  // --- 2. Get the current location object ---
  const location = useLocation();

  // State to manage navbar visibility
  const [isNavVisible, setIsNavVisible] = useState(true);
  // State to store the last scroll position
  const [lastScrollY, setLastScrollY] = useState(0);

  // This effect will run when the component mounts to add a scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Only hide after scrolling a bit
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }

      // Update the last scroll position
      setLastScrollY(currentScrollY);
    };

    // Add the event listener
    window.addEventListener("scroll", handleScroll);

    // IMPORTANT: Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]); // Re-run the effect when lastScrollY changes

  // --- 3. Determine the special header class based on the URL pathname ---
  let headerClass = "";
  if (location.pathname === "/about") {
    headerClass = "header-about-theme";
  } else if (location.pathname === "/contact") {
    headerClass = "header-contact-theme";
  }

  return (
    <>
      {/* --- 4. Add the new headerClass to the className string --- */}
      <header
        className={`fixed-header ${
          isNavVisible ? "visible" : "hidden"
        } ${headerClass}`}
      >
        <nav className="navigation">
          <Link to="/">home</Link>
          <Link to="/shop">shop</Link>
          <Link to="/music">music</Link>
          <Link to="/videos">videos</Link>
          {/* <Link to="/about">about</Link> */}
          {/* <Link to="/unlock">[unlock song]</Link> */}
          <Link to="/contact">contact</Link>
        </nav>
      </header>

      <main className="main-content-area">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;

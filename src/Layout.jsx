// src/Layout.jsx

import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './App.css'; // We'll be adding styles here

function Layout() {
  // State to manage navbar visibility
  const [isNavVisible, setIsNavVisible] = useState(true);
  // State to store the last scroll position
  const [lastScrollY, setLastScrollY] = useState(0);

  // This effect will run when the component mounts to add a scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 80) { // Only hide after scrolling a bit
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }

      // Update the last scroll position
      setLastScrollY(currentScrollY);
    };

    // Add the event listener
    window.addEventListener('scroll', handleScroll);

    // IMPORTANT: Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]); // Re-run the effect when lastScrollY changes

  return (
    <>
      {/* Conditionally apply a 'hidden' class based on our state */}
      <header className={`fixed-header ${isNavVisible ? 'visible' : 'hidden'}`}>
        <nav className="navigation">
          <Link to="/">[home]</Link>
          <Link to="/shop">[shop]</Link>
          <Link to="/music">[music]</Link>
          <Link to="/videos">[videos]</Link>
          {/* <Link to="/unlock">[unlock song]</Link> */}
          <Link to="/contact">[contact]</Link>
        </nav>
      </header>

      <main className="main-content-area">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
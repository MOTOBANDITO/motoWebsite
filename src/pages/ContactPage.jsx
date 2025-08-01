// src/pages/ContactPage.jsx

import React, { useState } from "react";
import "./ContactPage.css";
import useBodyClass from "../hooks/useBodyClass";

export const ContactPage = () => {
  useBodyClass("contact-page-active");
  // State to track if the mouse is over the button
  const [isHovered, setIsHovered] = useState(false);
  // State to manage the text in the prompt below the button
  const [copyPrompt, setCopyPrompt] = useState("Click to copy to clipboard");

  // This function runs when the button is clicked
  const handleCopyClick = async () => {
    const email = "motobanditboys@gmail.com";
    try {
      // Use the modern Navigator API to copy text to the clipboard
      await navigator.clipboard.writeText(email);
      // Give the user feedback that it worked
      setCopyPrompt("Copied!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setCopyPrompt("Failed to copy!");
    }
  };

  return (
    <>
      <title>MOTO BANDIT | Contact</title>
      <meta
        name="description"
        content="Get in touch with MOTO BANDIT. For booking, press, or other inquiries, find our contact information here."
      />

      <div className="email-container">
        <button
          className="email-button"
          onClick={handleCopyClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            // Reset the prompt text when the mouse leaves
            setTimeout(() => setCopyPrompt("Click to copy to clipboard"), 300);
          }}
        >
          motobanditboys@gmail.com
        </button>

        {/* The small text that fades in/out */}
        <p className={`copy-prompt ${isHovered ? "visible" : ""}`}>
          {copyPrompt}
        </p>
      </div>
    </>
  );
};

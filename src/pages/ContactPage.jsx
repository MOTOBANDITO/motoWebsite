// src/pages/ContactPage.jsx

import React, { useState } from "react";
import "./ContactPage.css";

import contactPhoto from "../assets/aboutBG.jpg";
import contactVideo from "../assets/philip.mp4";

export const ContactPage = () => {
  const [copyPrompt, setCopyPrompt] = useState("Click to copy to clipboard");
  const [showVideo, setShowVideo] = useState(false);

  // --- NEW STATE for prompt visibility ---
  const [isPromptVisible, setIsPromptVisible] = useState(false);

  const handleCopyClick = async () => {
    if (showVideo) return;

    const email = "motoband-itboys@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      setCopyPrompt("Copied!");
      setShowVideo(true);

      // --- ALSO MAKE THE PROMPT PERMANENTLY VISIBLE ---
      setIsPromptVisible(true);
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
        <div className="contact-image-wrapper">
          {/* 2. Conditionally render either the img or the video */}
          {!showVideo ? (
            <img
              src={contactPhoto}
              alt="Contact visual"
              className="contact-image"
            />
          ) : (
            <video
              src={contactVideo}
              autoPlay
              loop
              muted
              playsInline
              className="contact-image" // Use the same class for styling
            ></video>
          )}
        </div>
        <button
          className="email-button"
          onClick={handleCopyClick}
          // The prompt is now visible on hover
          onMouseEnter={() => setIsPromptVisible(true)}
          // The prompt is hidden on mouse leave ONLY if the form hasn't been submitted
          onMouseLeave={() => {
            if (!showGif) {
              setIsPromptVisible(false);
            }
          }}
        >
          motobanditboys@gmail.com
        </button>

        {/* The prompt's visibility is now controlled by the new state */}
        <p className={`copy-prompt ${isPromptVisible ? "visible" : ""}`}>
          {copyPrompt}
        </p>
      </div>
    </>
  );
};

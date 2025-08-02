// src/pages/HomePage.jsx

import React, { useState } from "react";
import motoLogo from "../assets/motologoRedBlur.webp";
import brandtImage from "../assets/brandt.png"; // <-- 1. Import the new image
import "./HomePage.css";
// I've removed the unused useBodyClass import to keep things clean.

function HomePage() {
  const [status, setStatus] = useState("");
  const FORM_ENDPOINT = "https://formspree.io/f/xblkobjd";
  // const FORM_ENDPOINT = "https://formspree.io/f/asdasdad";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    const data = new FormData(event.target);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        event.target.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  // If the form was submitted successfully, show a thank you message AND the image.
  if (status === "success") {
    return (
      <>
        <title>MOTO BANDIT | Official Website</title>
        <meta
          name="description"
          content="The official home of MOTO BANDIT. Listen to our music, shop official merchandise, watch videos, and get in touch."
        />
        <div className="home-content-container">
          <img src={motoLogo} alt="MOTOBANDIT logo" className="centered-logo" />
          <div className="thank-you-message">
            <h2>Thank you!</h2>
            <p>Your secret is safe with us.</p>
          </div>
        </div>
        <div className="brandt-container">
          {/* --- 2. ADD THE POPUP IMAGE HERE --- */}
          <img src={brandtImage} alt="Brandt" className="brandt-popup" />
        </div>
      </>
    );
  }

  // Otherwise, show the form.
  return (
    <>
      <title>MOTO BANDIT | Official Website</title>
      <meta
        name="description"
        content="The official home of MOTO BANDIT. Listen to our music, shop official merchandise, watch videos, and get in touch."
      />
      <div className="home-content-container">
        <img src={motoLogo} alt="MOTOBANDIT logo" className="centered-logo" />
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input
                type="text"
                name="secret"
                placeholder="say something to us anonymously..."
                required
                disabled={status === "submitting"}
              />
              <button type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? "..." : "send"}
              </button>
            </div>
            {status === "error" && (
              <p className="error-message">Oops! There was a problem.</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default HomePage;

// src/pages/HomePage.jsx

import React, { useState } from "react";
import motoLogo from "../assets/motologoRedBlur.webp";
import brandtImage from "../assets/brandt.png"; // <-- 1. Import the new image
import "./HomePage.css";
// I've removed the unused useBodyClass import to keep things clean.

function HomePage() {
  const [status, setStatus] = useState("");
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);
  const [discountCopied, setDiscountCopied] = useState(false);
  const FORM_ENDPOINT = "https://formspree.io/f/xblkobjd";
  // const FORM_ENDPOINT = "https://formspree.io/f/asdasdad";
  
  // Change this to your actual discount code
  const DISCOUNT_CODE = "HOFFMAN";

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
        // Show discount popup after successful submission
        setShowDiscountPopup(true);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const handleCopyDiscount = async () => {
    try {
      await navigator.clipboard.writeText(DISCOUNT_CODE);
      setDiscountCopied(true);
      setTimeout(() => setDiscountCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy discount code: ", err);
    }
  };

  const handleClosePopup = () => {
    setShowDiscountPopup(false);
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
        {/* Discount Code Popup */}
        {showDiscountPopup && (
          <div className="discount-popup-overlay" onClick={handleClosePopup}>
            <div className="discount-popup-content" onClick={(e) => e.stopPropagation()}>
              <button className="discount-popup-close" onClick={handleClosePopup}>
                ×
              </button>
              <h2 className="discount-popup-title">15% OFF</h2>
              <p className="discount-popup-message">
                Wow, fun! You can use this code at checkout:
              </p>
              <div className="discount-code-container">
                <span className="discount-code">{DISCOUNT_CODE}</span>
                <button 
                  className="discount-copy-button"
                  onClick={handleCopyDiscount}
                >
                  {discountCopied ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="discount-popup-footer">
                Visit our <a href="/shop" className="discount-shop-link">shop</a> to use this code
              </p>
            </div>
          </div>
        )}
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

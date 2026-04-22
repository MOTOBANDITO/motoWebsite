// src/pages/HomePage.jsx

import React, { useState, useEffect, useCallback } from "react";
import motoLogo from "../assets/motologoRedBlur.webp";
import brandtImage from "../assets/brandt.png"; // <-- 1. Import the new image
import "./HomePage.css";
import { ga4Event } from "../analytics.js";
// I've removed the unused useBodyClass import to keep things clean.

const DAYLIGHT_DOOM_VIDEO_ID = "8wyPRI9XIFM";

const DAYLIGHT_DOOM_YOUTUBE_URL = (() => {
  const u = new URL("https://www.youtube.com/watch");
  u.searchParams.set("v", DAYLIGHT_DOOM_VIDEO_ID);
  u.searchParams.set("utm_source", "motobandit.net");
  u.searchParams.set("utm_medium", "homepage_modal");
  u.searchParams.set("utm_campaign", "daylight_doom_video");
  return u.toString();
})();

const DAYLIGHT_DOOM_THUMB = `https://img.youtube.com/vi/${DAYLIGHT_DOOM_VIDEO_ID}/maxresdefault.jpg`;
const DAYLIGHT_PROMO_DISMISSED_KEY = "motobandit_daylightDoomPromoDismissed";

function HomePage() {
  const [status, setStatus] = useState("");
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);
  const [discountCopied, setDiscountCopied] = useState(false);
  const [showDaylightPromo, setShowDaylightPromo] = useState(() => {
    if (typeof sessionStorage === "undefined") return false;
    return !sessionStorage.getItem(DAYLIGHT_PROMO_DISMISSED_KEY);
  });
  const FORM_ENDPOINT = "https://formspree.io/f/xblkobjd";
  // const FORM_ENDPOINT = "https://formspree.io/f/asdasdad";
  
  // Change this to your actual discount code
  const DISCOUNT_CODE = "HOFFMAN";

  const dismissDaylightPromo = useCallback(() => {
    sessionStorage.setItem(DAYLIGHT_PROMO_DISMISSED_KEY, "1");
    setShowDaylightPromo(false);
  }, []);

  useEffect(() => {
    if (!showDaylightPromo) return;
    const onKey = (e) => {
      if (e.key === "Escape") dismissDaylightPromo();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [showDaylightPromo, dismissDaylightPromo]);

  const daylightPromoModal =
    showDaylightPromo && (
      <div
        className="daylight-promo-overlay"
        onClick={dismissDaylightPromo}
        role="presentation"
      >
        <div
          className="daylight-promo-panel"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="daylight-promo-heading"
        >
          <button
            type="button"
            className="daylight-promo-close"
            onClick={dismissDaylightPromo}
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={DAYLIGHT_DOOM_THUMB}
            alt=""
            className="daylight-promo-thumb"
          />
          <p id="daylight-promo-heading" className="daylight-promo-heading">
            DAYLIGHT DOOM VIDEO OUT NOW!
          </p>
          <a
            href={DAYLIGHT_DOOM_YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="daylight-promo-watch"
            onClick={() => {
              ga4Event("daylight_doom_promo_watch", {
                video_id: DAYLIGHT_DOOM_VIDEO_ID,
                link_url: DAYLIGHT_DOOM_YOUTUBE_URL,
              });
              dismissDaylightPromo();
            }}
          >
            Watch now
          </a>
        </div>
      </div>
    );

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
        dismissDaylightPromo();
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
        {daylightPromoModal}
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
      {daylightPromoModal}
    </>
  );
}

export default HomePage;

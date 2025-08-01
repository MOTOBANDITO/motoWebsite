// src/pages/AboutPage.jsx

import React from "react";
import "./AboutPage.css";
import useBodyClass from "../hooks/useBodyClass";

export const AboutPage = () => {
  useBodyClass("about-page-active");
  return (
    <>
      <title>About - MOTO BANDIT</title>
      <meta
        name="description"
        content="On the precipice of new American punk soul— MOTO BANDIT hails from Cincinnati, Ohio, California..."
      />

      <div className="about-page-container">
        <div className="about-content">
          {/* --- The text now comes second --- */}
          <div className="about-text">
            <p>
              On the precipice of new American punk soul— MOTO BANDIT hails from
              Cincinnati, Ohio, California. Single handedly branding a new
              iteration of east Nashville pop-rock. They will melt your brain
              and gouge your eyes with their breathy yet enigmatic three quarter
              bass notes. Pitchfork (music festival) calls it, “the worst band
              working today,” and they might just be right. We asked MOTO BANDIT
              for comment and they said that they weren’t immediately available
              but then they responded 20 minutes later with one sentence: “We
              love the pentatonic scale.”
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

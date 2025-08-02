// src/pages/VideoPage.jsx

import React, { useState, useEffect } from "react"; // <-- Make sure useEffect is imported
import "./VideoPage.css";
import sideGraphic from "../assets/philip_cutout2.png";

// The YouTubePlayer component (no changes needed here)
const YouTubePlayer = ({ videoId, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = () => setIsPlaying(true);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    <div className="video-wrapper">
      {!isPlaying ? (
        <div className="video-thumbnail-container" onClick={handlePlay}>
          <img src={thumbnailUrl} alt={title} className="video-thumbnail" />
          <div className="custom-play-button"></div>
        </div>
      ) : (
        <iframe
          className="responsive-iframe"
          src={embedUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

// --- Your main VideoPage component ---
function VideoPage() {
  // --- 1. ADD STATE TO TRACK SCROLL PROGRESS ---
  const [scrollProgress, setScrollProgress] = useState(0);

  // --- 2. ADD USEEFFECT TO LISTEN FOR SCROLL EVENTS ---
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Define "full scroll" as 500 pixels. You can change this value.
      const progress = Math.min(scrollTop / 500, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Run once on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- 3. PASS THE SCROLL PROGRESS TO THE CONTAINER AS A CSS VARIABLE ---
  return (
    <div
      className="video-page-container"
      style={{ "--scroll-progress": scrollProgress }}
    >
      <img
        src={sideGraphic}
        alt="Left decorative graphic"
        className="side-graphic left"
      />
      <img
        src={sideGraphic}
        alt="Right decorative graphic"
        className="side-graphic right"
      />
      <div>
        <h1 className="video-page-title">VIDEOS</h1>
      </div>

      {/* Your list of videos (no changes needed here) */}
      <YouTubePlayer videoId="XR6BNYPyJKI" title="KEANU: WEAPONIZED" />
      <YouTubePlayer videoId="MUCQ69j21xk" title="WINONA" />
      <YouTubePlayer videoId="OUZ8463H2_g" title="DAYLIGHT DOOM - LYRIC" />
      <YouTubePlayer
        videoId="Z94svX77oOk"
        title="GUNNAR DOWNS: THE SOUL OF COUNTRY"
      />
      <YouTubePlayer videoId="JzmuvOVYTfo" title="LUnCH BrEAK" />
      <YouTubePlayer videoId="IWufSlmh0GM" title="FIRST DATE" />
    </div>
  );
}

export default VideoPage;

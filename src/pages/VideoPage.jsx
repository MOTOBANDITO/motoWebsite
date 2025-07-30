// src/pages/VideoPage.jsx

import React from 'react';
import './VideoPage.css'; // We will create this file next for styling

export const VideoPage = () => {
  // Replace these with the actual video IDs from your YouTube embed links
  const videoId1 = 'XR6BNYPyJKI?si=4BrzafKUohzL741u';
  const videoId2 = 'MUCQ69j21xk?si=RNFN0s74ey_lN_gy';

  return (
    <>
  <title>Music Videos - MOTO BANDIT</title>
  <meta name="description" content="Watch all the official music videos from MOTO BANDIT. The complete video collection in one place." />

  {/* The rest of your video page component... */}
    <div className="video-page-container">

      {/* --- First Video --- */}
      <div className="video-wrapper">
        <iframe
          className="responsive-iframe"
          src={`https://www.youtube.com/embed/${videoId1}`}
          title="YouTube video player 1"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* --- Second Video --- */}
      <div className="video-wrapper">
        <iframe
          className="responsive-iframe"
          src={`https://www.youtube.com/embed/${videoId2}`}
          title="YouTube video player 2"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
    </>
  );
}
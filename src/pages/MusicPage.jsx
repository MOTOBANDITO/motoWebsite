import React from 'react';
import { releases } from '../data/musicData'; // Import our data
import './MusicPage.css'; // Import our styles

export const MusicPage = () => {
  return (
    <div className="music-page">
      <h1 className="music-page-title">MUSIC</h1>
      
      <div className="album-grid">
        {releases.map((release) => (
          <div key={release.id} className="album-card">
            <img src={release.image} alt={release.title} className="album-art" />
            <h2 className="album-title">{release.title}</h2>
            <p className="album-year">{release.year}</p>
            <div className="album-links">
              <a href={release.links.buy} target="_blank" rel="noopener noreferrer">Buy</a>
              <a href={release.links.stream} target="_blank" rel="noopener noreferrer">Stream</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
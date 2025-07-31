import React from 'react';
import { releases } from '../data/musicData'; // Import our data
import './MusicPage.css'; // Import our styles

export const MusicPage = () => {
  return (
    <>
  <title>MOTO BANDIT | Music & Discography </title>
  <meta name="description" content="Explore the complete discography of MOTO BANDIT. Stream all our official releases, including Twin Flame, Pile of Garbage, Guzzler EP, and more." />

  {/* The rest of your music page component... */}
    <div className="music-page">
      <h1 className="music-page-title">MUSIC</h1>
      
      <div className="album-grid">
        {releases.map((release) => (
          <div key={release.id} className="album-card">
            <img src={release.image} alt={release.title} loading="lazy" width="300" height="300" className="album-art" />
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
    </>
  );
};
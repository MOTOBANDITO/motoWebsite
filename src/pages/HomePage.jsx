// src/pages/HomePage.jsx

import React, { useState } from 'react';
import motoLogo from '../assets/motologoRedBlur.png';
import './HomePage.css';

function HomePage() {
  const [status, setStatus] = useState(''); // To hold 'submitting', 'success', or 'error'
  const FORM_ENDPOINT = "https://formspree.io/f/xblkobjd";

  // This is the new asynchronous submit handler
  const handleSubmit = async (event) => {
    // 1. Prevent the default page reload
    event.preventDefault();

    // 2. Set status to "submitting" to give user feedback
    setStatus('submitting');
    
    // 3. Get the form data
    const data = new FormData(event.target);

    try {
      // 4. Send the data to Formspree using fetch
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json' // This tells Formspree to send a JSON response back
        }
      });

      // 5. Handle the response
      if (response.ok) {
        setStatus('success');
        event.target.reset(); // Clear the form fields
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  // If the form was submitted successfully, show a thank you message.
  if (status === 'success') {
    return (
      <>
  <title>MOTO BANDIT | Official Website</title>
  <meta name="description" content="The official home of MOTO BANDIT. Listen to our music, shop official merchandise, watch videos, and get in touch." />
  
  {/* The rest of your homepage component... */}
      <div className="home-content-container">
        <img src={motoLogo} alt="MOTOBANDIT logo" className="centered-logo" />
        <div className="thank-you-message">
          <h2>Thank you!</h2>
          <p>Your secret is safe with us.</p>
        </div>
      </div>
      </>
    );
  }

  // Otherwise, show the form.
  return (
    <>
  <title>MOTO BANDIT | Official Website</title>
  <meta name="description" content="The official home of MOTO BANDIT. Listen to our music, shop official merchandise, watch videos, and get in touch." />
  
  {/* The rest of your homepage component... */}
    <div className="home-content-container">
      <img src={motoLogo} alt="MOTOBANDIT logo" className="centered-logo" />

      <div className="form-container">
        {/* We removed the 'action' and 'method' attributes and now use onSubmit */}
        <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="secret"
              placeholder="say something to us anonymously..."
              required
              disabled={status === 'submitting'} // Disable input while submitting
            />
            <button type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? '...' : 'send'}
            </button>
          {status === 'error' && <p className="error-message">Oops! There was a problem.</p>}
        </form>
      </div>
    </div>
    </>
  );
}

export default HomePage;
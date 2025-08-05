// src/pages/WallPage.jsx

import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import "./WallPage.css";
import leoProfanity from "leo-profanity";

leoProfanity.loadDictionary("en");

export const WallPage = () => {
  const [writings, setWritings] = useState([]);
  const [newWriting, setNewWriting] = useState({
    text: "",
    x: 0,
    y: 0,
    rotation: 0,
  });
  const [mode, setMode] = useState("viewing");
  const nodeRef = useRef(null); // For react-draggable fix

  useEffect(() => {
    // ... Firebase fetch logic ...
  }, []);

  const handleTyping = (e) => {
    setNewWriting({ ...newWriting, text: e.target.value });
  };

  const handleRotation = (e) => {
    setNewWriting({ ...newWriting, rotation: parseInt(e.target.value, 10) });
  };

  const startPlacing = () => {
    if (newWriting.text.trim() === "") return;
    const cleanText = leoProfanity.clean(newWriting.text);
    const initialRotation = Math.floor(Math.random() * 20) - 10;
    setNewWriting({
      ...newWriting,
      text: cleanText,
      rotation: initialRotation,
    });
    setMode("placing");
  };

  // --- NEW: This function updates the position IN REAL TIME during drag ---
  const handleDrag = (e, data) => {
    setNewWriting((prev) => ({ ...prev, x: data.x, y: data.y }));
  };

  // --- RENAMED: This is the old handleStopDragging, now triggered by a button ---
  const handleConfirmPlacement = () => {
    // The final writing object is simply our current state
    const finalWriting = newWriting;

    // Here you would save to Firebase:
    // db.collection('writings').add(finalWriting);
    console.log("Saving to DB:", finalWriting); // For testing

    // Reset the UI back to the start
    setNewWriting({ text: "", x: 0, y: 0, rotation: 0 });
    setMode("viewing");
  };

  return (
    <div className="wall-container">
      {/* ... (Displaying permanent writings remains the same) ... */}

      {/* Input mode (remains the same) */}
      {mode === "typing" && (
        <div className="input-box">
          <input
            type="text"
            value={newWriting.text}
            onChange={handleTyping}
            placeholder="Leave your mark..."
          />
          <button onClick={startPlacing}>Place it</button>
        </div>
      )}

      {/* Placing mode (with major changes) */}
      {mode === "placing" && (
        <div className="placing-ui">
          <Draggable
            nodeRef={nodeRef}
            onDrag={handleDrag} // <-- Use onDrag to update state continuously
            position={{ x: newWriting.x, y: newWriting.y }} // <-- Control the position via state
          >
            <div
              ref={nodeRef}
              className="draggable-text"
              style={{ transform: `rotate(${newWriting.rotation}deg)` }}
            >
              {newWriting.text}
            </div>
          </Draggable>

          <div className="controls-container">
            <div className="rotation-controls">
              <label>Rotate</label>
              <input
                type="range"
                min="-45"
                max="45"
                value={newWriting.rotation}
                onChange={handleRotation}
              />
            </div>
            {/* --- NEW: The Confirm button --- */}
            <button className="confirm-button" onClick={handleConfirmPlacement}>
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* Viewing mode button (remains the same) */}
      {mode === "viewing" && (
        <button
          className="start-writing-button"
          onClick={() => setMode("typing")}
        >
          Write on the wall
        </button>
      )}
    </div>
  );
};

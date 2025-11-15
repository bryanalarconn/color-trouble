import React, { useState, useEffect } from "react";
import WebcamImage from "./WebcamImage";
import ColorThief from "color-thief-browser";
import "./App.css";

function App() {
  const [captured, setCaptured] = useState(null);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    if (!captured) return;

    const imgElement = document.getElementById("captured-image");
    if (!imgElement) return;

    imgElement.onload = () => {
      try{
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(imgElement, 6);
        setColors(palette);
      } catch (error) {
        console.error("Error extracting colors:", error);
      }
    };
  }, [captured]);

  return (
    <div className="App">
      <h1>Color Trouble</h1>
      <WebcamImage onCapture={setCaptured} />
      {captured && (
        <>
          <h2>Captured Image</h2>
          <img 
          id="captured-image" 
          src={captured}
            alt="Captured"
          />
          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 20,
              justifyContent: "center",
            }}
          >
            {colors.map((c, i) => (
              <div
                key={i}
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: `rgb(${c[0]}, ${c[1]}, ${c[2]})`,
                  borderRadius: 8,
                  border: "2px solid #000",
                }}
              ></div>
            ))}
          </div>
       </>
      )}
    </div>
  );
}
export default App;

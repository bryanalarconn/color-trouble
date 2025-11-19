import React, { useState, useEffect, useRef } from "react";
import WebcamImage from "./WebcamImage";
import ColorThief from "color-thief-browser";
import "./App.css";

// Helper function to convert RGB to HEX
const rgbToHex = (r, g, b) => {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};
// Helper function to copy text to clipboard
const copyText = (text) => {
  if (!text) return;
  navigator.clipboard.writeText(text);
  alert(`Copied: ${text}`);
};

function App() {
  const [captured, setCaptured] = useState(null);
  const [colors, setColors] = useState([]);
  const [format, setFormat] = useState("hex");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [flash, setFlash] = useState(false);

  const hiddenImgRef = useRef(null);

  // Extract colors when a new image is captured
  useEffect(() => {
    if (!captured) return;

    const imgElement = hiddenImgRef.current;
    if (!imgElement) return;

    imgElement.onload = () => {
      try {
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(imgElement, 6);
        setColors(palette);
      } catch (error) {
        console.error("Error extracting colors:", error);
      }
    };
    imgElement.src = captured;
  }, [captured]);

  return (
    <div className="App">
      <h1 className="app-title">Color Trouble</h1>{/*Title of the app }} */}
      <WebcamImage
        onCapture={(img, { flash: doFlash } = {}) => {
          setCaptured(img);
          if (doFlash) {
            setFlash(true);
            setTimeout(() => setFlash(false), 100);
          }
        }}
      />{" "}
      {/*Webcam component to capture image*/}
      <img ref={hiddenImgRef} alt="Captured" style={{ display: "none" }} />{" "}
      {/*Hidden image for color extraction*/}
      {/* Format selection buttons */}
      <div className="format-wrapper">
        <span className="format-label">Display format:</span>
        <div className="format-toggle">
          <button
            onClick={() => setFormat("hex")}
            className={`format-button ${format === "hex" ? "active" : ""}`}
            aria-pressed={format === "hex"}
          >
            HEX
          </button>
          <button
            onClick={() => setFormat("rgb")}
            className={`format-button ${format === "rgb" ? "active" : ""}`}
            aria-pressed={format === "rgb"}
          >
            RGB
          </button>
        </div>
      </div>

      {flash && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "white",
            opacity: 0.85,
            zIndex: 9999,
            pointerEvents: "none",
            transition: "opacity 0.15s ease-out",
          }}
        ></div>
      )}
      {/* Display extracted colors */}
      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
        }}
      >
        {/* Only show colors if available */}
        {colors.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Map through colors and display each */}
            {colors.map((c, i) => {
              const [r, g, b] = c;
              const hex = rgbToHex(r, g, b);
              const rgb = `rgb(${r}, ${g}, ${b})`;
              const text = format === "hex" ? hex : rgb;

              // Auto choose white or black text
              const brightness = (r * 299 + g * 587 + b * 114) / 1000;
              const textColor = brightness > 140 ? "#000" : "#fff";

              // Return the color box with text on hover
              return (
                <div key={i} style={{ width: 100 }}>
                  <div
                    style={{
                      width: "100%",
                      height: 60,
                      backgroundColor: rgb,
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => copyText(text)}
                  >
                    {/* Text inside the color box */}
                    {hoveredIndex === i && (
                      <span
                        style={{
                          fontSize: 14,
                          color: textColor,
                          userSelect: "none",
                        }}
                      >
                        {text}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
export default App;

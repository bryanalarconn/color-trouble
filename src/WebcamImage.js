import React, { useCallback, useRef } from "react";
import Webcam from "react-webcam";

// Webcam component to capture images from the user's webcam
function WebcamImage({ onCapture }) {
  // Reference to the webcam component
  const webcamRef = useRef(null);
  // Function to capture the current frame from the webcam
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    // Pass the captured image to the parent component via the onCapture prop
    if (onCapture && typeof onCapture === "function") {
      onCapture(imageSrc);
    }
  }, [onCapture]);

  return (
    <div className="Container">
      {/* Webcam component to display the webcam feed */}
      <Webcam mirrored={true} ref={webcamRef} screenshotFormat="image/jpeg" />
      {/* Button to capture the current frame */}
      <div style={{ margin: 20 }}>
        <button
          onClick={() => capture()}
          style={{
            marginRight: 10,
            fontWeight: "bold",
            padding: "6px 12px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Capture Colors
        </button>
      </div>
    </div>
  );
}

export default WebcamImage;

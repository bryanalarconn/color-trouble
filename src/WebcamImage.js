import React, { useCallback, useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: { ideal: 1280 },
  height: { ideal: 720 },
  facingMode: "user",
};

// Webcam component to capture images from the user's webcam
function WebcamImage({ onCapture }) {
  // Reference to the webcam component
  const webcamRef = useRef(null);
  // Function to capture the current frame from the webcam
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    // Pass the captured image to the parent component via the onCapture prop
    if (onCapture && typeof onCapture === "function") {
      onCapture(imageSrc, { flash: true });
    }
  }, [onCapture]);
  return (
    //will call this classname in the css
    <div className="webcam-wrapper">
      <div className="camera-box">
        <Webcam
          mirrored={true}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="camera-feed"
          videoConstraints={videoConstraints}
        />
      </div>
      <button className="capture-btn" onClick={capture}>
        Capture Colors
      </button>
    </div>
  );
}

export default WebcamImage;

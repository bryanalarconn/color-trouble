import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

function WebcamImage({onCapture}) {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    if(onCapture && typeof onCapture === "function") {  
    onCapture(imageSrc);
    }
  }, [onCapture]);

  return (
    <div className="Container">
          <Webcam
            mirrored={true}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          <div>
          <button onClick={capture}>Capture Colors</button>
          </div>
    </div>
  );
}

export default WebcamImage;
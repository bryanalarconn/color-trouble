import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

function WebcamImage(onCapture) {
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);

  const videoConstraints = {
    facingMode: "user",
  };
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);

    if(onCapture){  
    onCapture(imageSrc);
    }
  }, [onCapture]);

  return (
    <div className="Container">
      {img === null ? (
        <>
          <Webcam
            mirrored={true}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <button onClick={capture}>Capture photo</button>
        </>
      ) : (
        <>
          <img src={img} alt="screenshot" />
          <button onClick={() => {
            setImg(null)
            if(onCapture) onCapture(null);
          }}>
            Retake
        </button>
        </>
      )}
    </div>
  );
}

export default WebcamImage;
  import React from 'react';
  import Webcam from 'react-webcam';

  const WebcamDisplay = () => {
    const videoConstraints = {
      facingMode: "selfie" // "user" for front camera, "environment" for rear camera
    };

    return (
      <div>
        <h2>Live Webcam Feed</h2>
        <Webcam
          height={480}
          width={640}
          videoConstraints={videoConstraints}
        />
      </div>
    );
  };

  export default WebcamDisplay;

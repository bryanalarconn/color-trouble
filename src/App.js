import React, { useState } from "react";
import WebcamImage from "./WebcamImage";
import "./App.css";

function App() {
  const [captured, setCaptured] = useState(null);

  return (
    <div className="App">
      <h1>Color Trouble</h1>
      <WebcamImage onCapture={setCaptured} />
      {captured && (
        <>
          <h2>Captured Image</h2>
          <img src={captured}
            alt="Captured"
          />
       </>
      )}
    </div>
  );
}
export default App;

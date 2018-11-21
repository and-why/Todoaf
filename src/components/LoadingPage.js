import React from "react";
import logo from "../images/logo.svg";

const LoadingPage = () => (
  <div className="loading-page">
    <div className="loader">
      <svg
        className="app-logo sway"
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
      >
        <defs />
        <title>logo</title>
        <path class="cls-1" d="M142.14,126.43a52.57,52.57,0,0,1-105.14,0" />
        <line class="cls-2" x1="37" y1="70.38" x2="37" y2="127.73" />
        <line class="cls-2" x1="65.92" y1="52.47" x2="65.92" y2="88.84" />
        <line class="cls-2" x1="94.84" y1="11" x2="94.84" y2="76" />
        <line class="cls-2" x1="123.77" y1="45.66" x2="123.77" y2="82.02" />
        <path class="cls-2" d="M163,97.45c-19.12,0-20.86,17.55-20.86,30.41" />
      </svg>
      <h1 className="loader__copy">Loading...</h1>
    </div>
  </div>
);

export default LoadingPage;

import React from "react";

const MonoReverseLogoWaves = () => {
  return (
    <svg
      className="logo-waves"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 24 100 28"
      preserveAspectRatio="none"
      shapeRendering="auto"
    >
      <defs>
        <path
          id="gentle-wave"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        ></path>
      </defs>
      <g className="logo-parallax">
        <use
          xlinkHref="#gentle-wave"
          x="48"
          y="0"
          fill="rgba(128, 128, 128,0.3)"
        ></use>
        <use
          xlinkHref="#gentle-wave"
          x="48"
          y="3"
          fill="rgba(128, 128, 128,0.2)"
        ></use>
        <use
          xlinkHref="#gentle-wave"
          x="48"
          y="5"
          fill="rgba(128, 128, 128,0.1)"
        ></use>
        <use
          xlinkHref="#gentle-wave"
          x="48"
          y="7"
          fill="rgb(128, 128, 128,0.5)"
        ></use>
      </g>
    </svg>
  );
};

export default MonoReverseLogoWaves;

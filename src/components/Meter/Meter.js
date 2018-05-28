import React from "react";

import "./Meter.css";

const Meter = ({ level }) => {
  const transformStyle = {
    transform: `scaleX(${level})`
  };

  return (
    <div className="meter">
      <div className="meter__level" style={transformStyle} />
    </div>
  );
};

export default Meter;

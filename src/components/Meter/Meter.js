import React from "react";
import PropTypes from 'prop-types';

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

Meter.propTypes = {
  level: PropTypes.number
}

export default Meter;

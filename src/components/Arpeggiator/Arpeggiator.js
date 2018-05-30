import React from "react";
import PropTypes from "prop-types";

import "./Arpeggiator.css";

const Arpeggiator = ({ onTogglePlayback, isPlaying }) => {
  return (
    <div className="arpeggiator">
      <div className="arpeggiator--inner">
        <button onClick={onTogglePlayback}>
          {isPlaying ? "Stop Arpeggio" : "Start Arpeggio"}
        </button>
      </div>
    </div>
  );
};

Arpeggiator.propTypes = {
  onTogglePlayback: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired
}

export default Arpeggiator;

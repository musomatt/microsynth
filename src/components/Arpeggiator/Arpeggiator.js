import React from "react";

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

export default Arpeggiator;

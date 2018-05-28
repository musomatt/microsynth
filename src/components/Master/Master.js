import React from "react";
import Dial from "components/Dial";

import "./Master.css";

const Master = ({ masterGainLevel, onMasterGainChange, onMasterPanChange }) => {
  return (
    <div className="master">
      <div className="master--inner">
        <Dial
          max="1"
          min="-1"
          level="0"
          title="MASTER PAN"
          onChangeValue={onMasterPanChange}
        />
        <Dial
          max="1"
          min="0"
          onChangeValue={onMasterGainChange}
          level="0.5"
          title="MASTER VOL"
        />
      </div>
    </div>
  );
};

export default Master;

import React from "react";
import PropTypes from "prop-types";
import Dial from "../Dial";

import "./Master.css";

const Master = ({ 
  onMasterGainChange, 
  onMasterPanChange, 
  onMasterPitchChange 
}) => {
  return (
    <div className="master">
      <div className="master--inner">
        <Dial
          max="1"
          min="-1"
          level="0"
          title="PITCH"
          onChangeValue={onMasterPitchChange}
        />
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
          level="0.5"
          title="MASTER VOL"
          onChangeValue={onMasterGainChange}
        />
      </div>
    </div>
  );
};

Master.propTypes = {
  onMasterGainChange: PropTypes.func.isRequired,
  onMasterPanChange: PropTypes.func.isRequired
};

export default Master;

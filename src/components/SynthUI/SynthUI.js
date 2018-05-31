import React from "react";
import PropTypes from "prop-types";
import Meter from "../Meter";
import Oscillator from "../Oscillator";
import Master from "../Master";
import Arpeggiator from "../Arpeggiator";

import "./SynthUI.css";

const SynthUI = ({
  isPlaying,
  volumeLevel,
  masterGainLevel,
  onTogglePlayback,
  onMasterPitchChange,
  onMasterGainChange,
  onMasterPanChange,
  onOscillatorChange
}) => {
  return (
    <div className="synth">
      <Meter level={volumeLevel} />
      <div className="controls">
        <Oscillator
          id="0"
          title="Oscillator 1"
          onSettingsChange={onOscillatorChange}
        />
        <Oscillator
          id="1"
          title="Oscillator 2"
          onSettingsChange={onOscillatorChange}
        />
      </div>
      <div className="controls">
        <Arpeggiator
          onTogglePlayback={onTogglePlayback}
          isPlaying={isPlaying}
        />
        <Master
          onMasterPitchChange={onMasterPitchChange}
          onMasterPanChange={onMasterPanChange}
          onMasterGainChange={onMasterGainChange}
        />
      </div>
    </div>
  );
};

SynthUI.propTypes = {
  volumeLevel: PropTypes.number,
  isPlaying: PropTypes.bool.isRequired,
  onTogglePlayback: PropTypes.func.isRequired,
  onMasterPitchChange: PropTypes.func.isRequired,
  onMasterGainChange: PropTypes.func.isRequired,
  onMasterPanChange: PropTypes.func.isRequired,
  onOscillatorChange: PropTypes.func.isRequired
};

export default SynthUI;

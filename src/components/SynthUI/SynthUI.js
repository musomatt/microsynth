import React from "react";
import PropTypes from "prop-types";
import Meter from "components/Meter";
import Oscillator from "components/Oscillator";
import Master from "components/Master";
import Arpeggiator from "components/Arpeggiator";

import "./SynthUI.css";

const SynthUI = ({
  isPlaying,
  volumeLevel,
  masterGainLevel,
  onTogglePlayback,
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
  onMasterGainChange: PropTypes.func.isRequired,
  onMasterPanChange: PropTypes.func.isRequired,
  onOscillatorChange: PropTypes.func.isRequired
};

export default SynthUI;

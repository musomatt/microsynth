import React from "react";
import Meter from "components/Meter";
import Oscillator from "components/Oscillator";
import Master from "components/Master";
import Arpeggiator from "components/Arpeggiator";

import "./SynthUI.css";

const SynthUI = ({
  onTogglePlayback,
  isPlaying,
  volumeLevel,
  masterGainLevel,
  onWaveChange,
  onMasterGainChange,
  onMasterPanChange
}) => {
  return (
    <div className="synth">
      <Meter level={volumeLevel} />
      <div className="controls">
        <Oscillator title="Oscillator 1" onWaveChange={onWaveChange} />
        <Oscillator title="Oscillator 2" onWaveChange={onWaveChange} />
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

export default SynthUI;

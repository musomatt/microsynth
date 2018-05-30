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

export default SynthUI;

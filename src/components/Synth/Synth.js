import React from "react";
import SynthUI from "../SynthUI";
import { NOTES } from "../../constants/NoteConstants";
import AudioWrapper from "../../utils/AudioUtils";

class Synth extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isPlaying: false };

    this.arpPos = 0;
    this.arpShape = [0, 4, 7, 11, 12, 11, 7, 4];

    this.toneLength = 0.18;
    this.currentLevel = 0;
    this.pitch = 0;
    this.octave = 3;

    this.audio = new AudioWrapper();
    this.audio.setMasterGainLevel(0.5);
    this.audio.setMasterPanLevel(0);
    this.audio.setVolumeUpdate(this.onVolumeUpdate);
  }

  onVolumeUpdate = level => {
    if (level !== this.currentLevel) {
      this.currentLevel = level;
      this.setState({ volume: level });
    }
  };

  togglePlayback = () => {
    if (this.state.isPlaying) {
      this.stopArpeggio();
    } else {
      this.startArpeggio();
    }
  };

  getNextFrequency = () => {
    if (this.arpPos === this.arpShape.length) {
      this.arpPos = 0;
    }

    let noteValue = this.arpShape[this.arpPos];
    noteValue = noteValue + this.pitch;
    noteValue = noteValue + (12 * this.octave);

    let next = NOTES[noteValue].freq;

    this.arpPos++;

    return next;
  };

  onOscillatorChange = (id, settings) => {
    this.audio.updateOscillatorSettings(id, settings);
  };

  onMasterGainChange = level => {
    this.audio.setMasterGainLevel(level);
  };

  onMasterPanChange = level => {
    this.audio.setMasterPanLevel(level);
  };

  onMasterPitchChange = level => {
    this.pitch = Math.floor(level * 100 / 8);
  }

  startArpeggio = () => {
    let note = this.getNextFrequency();

    this.audio.playTone(note, this.toneLength);

    this.playback = setInterval(() => {
      let tone = this.getNextFrequency();

      this.audio.playTone(tone, this.toneLength);
    }, 185);

    this.setState({ isPlaying: true });
  };

  stopArpeggio = () => {
    clearInterval(this.playback);

    this.arpPos = 0;

    this.setState({ isPlaying: false });
  };

  render() {
    return (
      <SynthUI
        isPlaying={this.state.isPlaying}
        volumeLevel={this.state.volume}
        deviceSupportsPanning={this.audio.deviceSupportsPanning()}
        masterGainNode={this.masterGainNode}
        masterPanNode={this.masterPanNode}
        onMasterPitchChange={this.onMasterPitchChange}
        onMasterGainChange={this.onMasterGainChange}
        onMasterPanChange={this.onMasterPanChange}
        onTogglePlayback={this.togglePlayback}
        onOscillatorChange={this.onOscillatorChange}
      />
    );
  }
}

export default Synth;

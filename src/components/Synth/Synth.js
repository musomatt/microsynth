import React from "react";
import SynthUI from "components/SynthUI";
import { WAVEFORMS } from "constants/WaveConstants";
import { NOTES } from "constants/NoteConstants";
import AudioWrapper from "utils/AudioUtils";

class Synth extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isPlaying: false };

    this.arpPos = 0;
    this.arpShape = [0, 4, 7, 11, 12, 11, 7, 4];

    this.toneLength = 0.19;
    this.currentLevel = 0;
  }

  componentDidMount() {
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

    let next = NOTES[this.arpShape[this.arpPos]].freq;

    this.arpPos++;

    return next;
  };

  waveChange = (oscillator_id, type) => {
    this.setState({ oscWaveformType: type });
  };

  onMasterGainChange = level => {
    this.audio.setMasterGainLevel(level);
  };

  onMasterPanChange = level => {
    this.audio.setMasterPanLevel(level);
  };

  startArpeggio = () => {
    let note = this.getNextFrequency();

    this.audio.playTone(note, this.toneLength);

    this.playback = setInterval(() => {
      let tone = this.getNextFrequency();

      this.audio.playTone(tone, this.toneLength);
    }, 200);

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
        masterGainNode={this.masterGainNode}
        masterPanNode={this.masterPanNode}
        onMasterGainChange={this.onMasterGainChange}
        onMasterPanChange={this.onMasterPanChange}
        onTogglePlayback={this.togglePlayback}
        onWaveChange={this.waveChange}
      />
    );
  }
}

export default Synth;

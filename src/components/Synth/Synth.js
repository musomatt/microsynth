import React from "react";
import SynthUI from "components/SynthUI";

class Synth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
      oscWaveformType: "sine"
    };

    this.oscList = [];

    this.notes = [];
    this.notes.push({ octave: 3, note: "C", freq: 130.81 });
    this.notes.push({ octave: 3, note: "C#", freq: 138.59 });
    this.notes.push({ octave: 3, note: "D", freq: 146.83 });
    this.notes.push({ octave: 3, note: "D#", freq: 155.56 });
    this.notes.push({ octave: 3, note: "E", freq: 164.81 });
    this.notes.push({ octave: 3, note: "F", freq: 174.61 });
    this.notes.push({ octave: 3, note: "F#", freq: 185 });
    this.notes.push({ octave: 3, note: "G", freq: 196 });
    this.notes.push({ octave: 3, note: "G#", freq: 207.65 });
    this.notes.push({ octave: 3, note: "A", freq: 220 });
    this.notes.push({ octave: 3, note: "A#", freq: 233.08 });
    this.notes.push({ octave: 3, note: "B", freq: 246.94 });
    this.notes.push({ octave: 4, note: "C", freq: 261.63 });
    this.notes.push({ octave: 4, note: "C#", freq: 277.18 });
    this.notes.push({ octave: 4, note: "D", freq: 293.66 });
    this.notes.push({ octave: 4, note: "D#", freq: 311.13 });
    this.notes.push({ octave: 4, note: "E", freq: 329.63 });
    this.notes.push({ octave: 4, note: "F", freq: 349.23 });
    this.notes.push({ octave: 4, note: "F#", freq: 369.99 });
    this.notes.push({ octave: 4, note: "G", freq: 392.0 });
    this.notes.push({ octave: 4, note: "G#", freq: 415.3 });
    this.notes.push({ octave: 4, note: "A", freq: 440.0 });
    this.notes.push({ octave: 4, note: "A#", freq: 466.16 });
    this.notes.push({ octave: 4, note: "B", freq: 493.88 });
    this.notes.push({ octave: 4, note: "C", freq: 523.25 });

    this.arpShape = [0, 4, 7, 11, 12, 11, 7, 4];
    this.arpPos = 0;

    this.masterGainLevel = 0.5;
    this.masterPanLevel = 0;
  }

  componentDidMount() {
    this.setupAudioContext();
    this.setupProcessor();
    //this.startArpeggio();
  }

  setupAudioContext = () => {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // master pan and gain nodes
    this.masterPanNode = this.audioCtx.createStereoPanner();
    this.masterGainNode = this.audioCtx.createGain();

    // processor for grabbing amplitude
    this.processor = this.audioCtx.createScriptProcessor(2048);
    this.processor.connect(this.audioCtx.destination);

    // default values
    this.masterGainNode.gain.value = this.masterGainLevel;
    this.masterGainNode.connect(this.masterPanNode);

    this.masterPanNode.pan.value = 0;
    this.masterPanNode.connect(this.processor);
  };

  setupProcessor = () => {
    this.processor.onaudioprocess = this.processVolume;
    this.processor.clipping = false;
    this.processor.lastClip = 0;
    this.processor.volume = 0;
    this.processor.clipLevel = 0.98;
    this.processor.averaging = 0.95;
    this.processor.clipLag = 750;
  };

  processVolume = event => {
    let x;
    let sum = 0;
    let inputBuffer = event.inputBuffer;
    let outputBuffer = event.outputBuffer;

    // copy all of the input channel data across to the output channels
    for (let i = 0; i < outputBuffer.numberOfChannels; i++) {
      var inputData = inputBuffer.getChannelData(i);
      var outputData = outputBuffer.getChannelData(i);

      for (let sample = 0; sample < inputBuffer.length; sample++) {
        outputData[sample] = inputData[sample];

        x = inputData[i];
        sum += x * x;
      }
    }

    // calculate level with root mean square
    let rms = Math.sqrt(sum / inputBuffer.length);
    let level = Math.max(rms, this.processor.volume * this.processor.averaging);

    if (level !== this.state.volume) {
      this.processor.volume = level < 0.001 ? 0 : level;
      this.setState({ volume: level });
    }
  };

  playTone = frequency => {
    let osc = this.audioCtx.createOscillator();
    osc.connect(this.masterGainNode);
    osc.type = this.state.oscWaveformType;
    osc.frequency.value = frequency;
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.19);

    return osc;
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

    let next = this.notes[this.arpShape[this.arpPos]].freq;

    this.arpPos++;

    return next;
  };

  startArpeggio = () => {
    let note = this.getNextFrequency();

    this.playTone(note);

    this.playback = setInterval(() => {
      let tone = this.getNextFrequency();

      this.oscList.push(this.playTone(tone));
    }, 200);
    this.setState({ isPlaying: true });
  };

  stopArpeggio = () => {
    clearInterval(this.playback);

    this.oscList.forEach(osc => osc.stop());

    this.arpPos = 0;

    this.setState({ isPlaying: false });
  };

  waveChange = (oscillator_id, type) => {
    this.setState({ oscWaveformType: type });
  };

  onMasterGainChange = level => {
    if (level !== this.masterGainLevel) {
      this.masterGainLevel = level;
      this.masterGainNode.gain.value = level;
    }
  };

  onMasterPanChange = level => {
    if (level !== this.masterPanLevel) {
      this.masterPanLevel = level;
      this.masterPanNode.pan.value = level;
    }
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

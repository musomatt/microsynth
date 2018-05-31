class AudioWrapper {
  constructor() {
    // setup the audio chain
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    // master audio nodes for the oscillators to talk to
    this.masterPanNode = this.audioContext.createStereoPanner();
    this.masterGainNode = this.audioContext.createGain();
    this.masterProcessor = this.audioContext.createScriptProcessor(2048);

    // chain of master audio nodes
    this.masterGainNode.connect(this.masterPanNode);
    this.masterPanNode.connect(this.masterProcessor);

    this.masterProcessor.connect(this.audioContext.destination);
    this.masterProcessor.onaudioprocess = this.processVolumeLevel;
    this.masterProcessor.clipping = false;
    this.masterProcessor.lastClip = 0;
    this.masterProcessor.volume = 0;
    this.masterProcessor.clipLevel = 0.98;
    this.masterProcessor.averaging = 0.95;
    this.masterProcessor.clipLag = 750;

    // set default oscillator settings
    this.oscillators = [
      { type: "sine", gain: 0.5, pan: 0, detune: 0 },
      { type: "sine", gain: 0.5, pan: 0, detune: 0 }
    ];

    // list of oscillators currently playing
    this.oscList = [];
  }

  setMasterGainLevel(level) {
    this.masterGainNode.gain.setValueAtTime(
      level,
      this.audioContext.currentTime
    );
  }

  setMasterPanLevel(level) {
    this.masterPanNode.pan.setValueAtTime(level, this.audioContext.currentTime);
  }

  setDetuneLevel(level) {
    this.detune = level;
  }

  setVolumeUpdate(callback) {
    this.processorCallback = callback;
  }

  updateOscillatorSettings(id, settings) {
    Object.assign(this.oscillators[id], settings);
  }

  createOscillators() {
    let oscillators = [];

    for (let i = 0; i < this.oscillators.length; i++) {
      let osc = this.audioContext.createOscillator();
      let pan = this.audioContext.createStereoPanner();
      let gain = this.audioContext.createGain();

      // apply oscillator settings
      osc.type = this.oscillators[i].type;

      pan.pan.setValueAtTime(
        this.oscillators[i].pan,
        this.audioContext.currentTime
      );

      gain.gain.setValueAtTime(
        this.oscillators[i].gain,
        this.audioContext.currentTime
      );

      // build oscillator audio chain and output to the master gain
      osc.connect(gain);
      gain.connect(pan);
      pan.connect(this.masterGainNode);

      oscillators.push({ osc, gain, pan, detune: this.oscillators[i].detune });
    }

    return oscillators;
  }

  playTone(freq, length) {
    let oscillators = this.createOscillators();

    // pass the frequency through all our oscillators
    oscillators.forEach(oscillator => {
      oscillator.osc.frequency.setValueAtTime(
        freq,
        this.audioContext.currentTime
      );
      
      oscillator.osc.detune.setValueAtTime(
        oscillator.detune, 
        this.audioContext.currentTime
      );

      oscillator.osc.start();
      oscillator.osc.stop(this.audioContext.currentTime + length);
    });
  }

  processVolumeLevel = event => {
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
    let level = Math.max(
      rms,
      this.masterProcessor.volume * this.masterProcessor.averaging
    );

    this.masterProcessor.volume = level < 0.001 ? 0 : level;

    if (typeof this.processorCallback === "function") {
      this.processorCallback(this.masterProcessor.volume);
    }
  };
}

module.exports = AudioWrapper;

import React from "react";
import PropTypes from "prop-types";
import Dial from "../Dial";
import { WAVEFORMS } from "../../constants/WaveConstants";

import "./Oscillator.css";

class Oscillator extends React.PureComponent {
  state = {
    currentWaveform: WAVEFORMS.SINE
  };

  changeWaveform = type => {
    if (type !== this.state.currentWaveform) {
      this.props.onSettingsChange(this.props.id, { type });
      this.setState({ currentWaveform: type });
    }
  };

  onChangeTune = level => {
    this.props.onSettingsChange(this.props.id, { detune: level * 100 });
  };

  onChangePan = level => {
    this.props.onSettingsChange(this.props.id, { pan: level });
  };

  onChangeVolume = level => {
    this.props.onSettingsChange(this.props.id, { gain: level });
  };

  render() {
    return (
      <div className="oscillator">
        <div className="oscillator_title">
          {this.props.title || "Oscillator"}
        </div>
        <div className="oscillator_waves">
          <div className="oscillator_wave__container">
            <div
              className={
                this.state.currentWaveform === WAVEFORMS.SINE
                  ? "oscillator_wave oscillator_wave--selected"
                  : "oscillator_wave"
              }
              onClick={() => this.changeWaveform(WAVEFORMS.SINE)}
              title="Sine"
            >
              <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 21c-3.238 0-4.124-4.477-4.981-8.806C10.385 8.99 9.595 5 8 5c-1.495 0-3.042 4.438-3.703 6.333-.129.37-.248.712-.358 1.01l-1.878-.687c.106-.29.222-.623.347-.981C3.538 7.435 5.084 3 8 3c3.238 0 4.124 4.477 4.981 8.806C13.615 15.01 14.405 19 16 19c1.438 0 2.706-3.564 3.545-5.923.179-.5.351-.985.52-1.43l1.87.707c-.164.434-.331.906-.506 1.394C20.22 17.148 18.85 21 16 21z" />
              </svg>
            </div>
            <div
              className={
                this.state.currentWaveform === WAVEFORMS.SAWTOOTH
                  ? "oscillator_wave oscillator_wave--selected"
                  : "oscillator_wave"
              }
              onClick={() => this.changeWaveform(WAVEFORMS.SAWTOOTH)}
            >
              <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 21.204l-16-14V13H3V2.796l16 14V11h2z" />
              </svg>
            </div>
            <div
              className={
                this.state.currentWaveform === WAVEFORMS.SQUARE
                  ? "oscillator_wave oscillator_wave--selected"
                  : "oscillator_wave"
              }
              onClick={() => this.changeWaveform(WAVEFORMS.SQUARE)}
            >
              <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 20H11V6H5v6H3V4h10v14h6v-6h2z" />
              </svg>
            </div>
            <div
              className={
                this.state.currentWaveform === WAVEFORMS.TRIANGLE
                  ? "oscillator_wave oscillator_wave--selected"
                  : "oscillator_wave"
              }
              onClick={() => this.changeWaveform(WAVEFORMS.TRIANGLE)}
            >
              <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.961 20.948l-8-14-4.113 6.582-1.696-1.06 5.887-9.418 8 14 4.113-6.582 1.696 1.06z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="oscillator_controls">
          <Dial
            min="-1"
            max="1"
            level="0"
            title="TUNE"
            onChangeValue={this.onChangeTune}
          />
          {
            (this.props.deviceSupportsPanning) ? (
              <Dial
                min="-1"
                max="1"
                level="0"
                title="PAN"
                onChangeValue={this.onChangePan}
              />
            ) : "" 
          }
          <Dial
            min="0"
            max="1"
            level="0.5"
            title="VOL"
            onChangeValue={this.onChangeVolume}
          />
        </div>
      </div>
    );
  }
}

Oscillator.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  onSettingsChange: PropTypes.func.isRequired,
  deviceSupportsPanning: PropTypes.bool.isRequired
};

export default Oscillator;

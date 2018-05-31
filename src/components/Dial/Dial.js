import React from "react";
import PropTypes from "prop-types";
import { getArc } from "../../utils/ArcUtils";

import "./Dial.css";

class Dial extends React.PureComponent {
  state = {
    level: this.props.level
  };

  componentDidMount() {
    this.setDialLevel();
  }

  componentDidUpdate() {
    this.setDialLevel();
  }

  changeValue = event => {
    let delta = this.props.min == 0 ? event.deltaY / 2000 : event.deltaY / 500;
    let newValue = this.state.level - delta;

    newValue = newValue <= this.props.min ? this.props.min : newValue;
    newValue = newValue >= this.props.max ? this.props.max : newValue;

    this.props.onChangeValue(newValue);

    this.setState({ level: newValue });
  };

  setDialLevel = () => {
    let arcStart = -130;
    let arcEnd = 130;

    // set the outer dial arc
    this.dial.setAttribute("d", getArc(40, 40, 30, arcStart, arcEnd));

    // the level arc
    let level = -130 + this.state.level / this.props.max * 260;

    // for ranges between -1 and 1
    if (this.props.min == -1 && this.props.max == 1) {
      if (this.state.level < 0) {
        // moving to the left channel
        arcStart = this.state.level * 130;
        level = 0;
      } else if (this.state.level > 0) {
        // moving to the right channel
        arcStart = 0;
        level = this.state.level * 130;
      } else {
        // centered in stereo space
        arcStart = 0;
        level = 0;
      }
    }

    this.level.setAttribute("d", getArc(40, 40, 30, arcStart, level));
  };

  render() {
    return (
      <div className="dial_control" onWheel={this.changeValue}>
        <svg width="80px" height="60px">
          <path ref={node => (this.dial = node)} className="dial" fill="none" />
          <path ref={node => (this.level = node)} className="dial--level" />
        </svg>
        <p>{this.props.title}</p>
      </div>
    );
  }
}

Dial.propTypes = {
  min: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  title: PropTypes.string,
  onChangeValue: PropTypes.func
};

export default Dial;

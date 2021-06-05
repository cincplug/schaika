import React, { Component } from "react";

class Tone extends Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);

    this.state = {
      sound: null,
    };
  }

  play(e) {
    if (e.buttons) {
      var sound = this.props.play(this.props.nota);

      this.setState({
        sound: sound,
      });
    }
  }

  handleMouseUp() {
    if (this.state.sound) {
      this.props.stop(this.state.sound);
    }
  }

  handleMouseOut() {
    if (this.state.sound) {
      this.props.stop(this.state.sound);
    }
  }

  render() {
    const { shape } = this.props;
    return (
      <path
        className={this.props.class}
        d={this.props.path}
        onMouseDown={this.play}
        onMouseOver={this.play}
        onMouseOut={this.handleMouseOut}
        onMouseUp={this.handleMouseUp}
        transform={
          shape === 2
            ? `rotate(${this.props.index * -1.2})`
            : shape === 3
            ? `rotate(${this.props.index * 3.2})`
            : shape === 4
            ? `rotate(${this.props.index + 20})`
            : shape === 5
            ? `rotate(${Math.pow(this.props.index, 2.5)})`
            : shape === 6
            ? `rotate(${Math.sin(this.props.index * 1.5)})`
            : shape === 7
            ? `rotate(${Math.tan(this.props.index * 20.5)})`
            : shape === 8
            ? `rotate(${12 - this.props.index * 3.2})`
            : ""
        }
      >
        <bx-title>{this.props.tone}</bx-title>
      </path>
    );
  }
}

export default Tone;

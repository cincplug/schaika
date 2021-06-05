import React, { Component } from "react";

class Tone extends Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.getShape = this.getShape.bind(this);

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

  getShape() {
    const { index } = this.props;
    switch (this.props.shape) {
      case 1:
        return `rotate(${index * -1.2})`;
      case 2:
        return `rotate(${index * 2.2})`;
      default:
        return this.props.shape;
    }
  }

  render() {
    const { shape, index, factor, tractor } = this.props;
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
            ? `rotate(${(index * -factor) / 10 + tractor})`
            : shape === 3
            ? `rotate(${(index * factor) / 3 - tractor})`
            : shape === 4
            ? `rotate(${index + factor * 2 + tractor})`
            : shape === 5
            ? `rotate(${Math.pow(index, factor / 4 + tractor)})`
            : shape === 6
            ? `rotate(${Math.sin((index * factor) / 7 + tractor)})`
            : shape === 7
            ? `rotate(${Math.tan(index * factor * 2 - tractor)}) scale(${
                (index * tractor) / 20
              })`
            : shape === 8
            ? `rotate(${12 - (index * factor) / 2}) scale(${
                (index * factor) / 27
              })`
            : ""
        }
      >
        <bx-title>{this.props.tone}</bx-title>
      </path>
    );
  }
}

export default Tone;

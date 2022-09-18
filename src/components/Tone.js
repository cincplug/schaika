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
    if (e.buttons || this.props.isEager) {
      var sound = this.props.play(this.props.nota);

      this.setState({
        sound: sound,
      });
    }
  }

  handleMouseUp() {
    if (this.state.sound) {
      this.props.stop(this.state.sound, this.props.nota);
    }
  }

  handleMouseOut() {
    if (this.state.sound) {
      this.props.stop(this.state.sound, this.props.nota);
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
    const { shape, index, factor, modifier, isPressed } = this.props;
    
    return (
      <path
        className={
          this.props.class +
          (isPressed
            ? " stis"
            : " nestis")
        }
        d={this.props.path}
        onMouseDown={this.play}
        onMouseOver={this.play}
        onMouseOut={this.handleMouseOut}
        onMouseUp={this.handleMouseUp}
        transform={
          shape === 2
            ? `rotate(${(index * -factor) / 10 + modifier})`
            : shape === 3
            ? `rotate(${(index * factor) / 3 - modifier})`
            : shape === 4
            ? `rotate(${index + factor * 2 + modifier})`
            : shape === 5
            ? `rotate(${Math.pow(index, factor / 4 + modifier)})`
            : shape === 6
            ? `rotate(${Math.sin((index * factor) / 24 - modifier)})`
            : shape === 7
            ? `rotate(${Math.tan(index * factor * 2 + modifier)}) scale(${
                (index * modifier) / 20
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

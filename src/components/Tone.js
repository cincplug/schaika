import React, { Component } from "react";

class Tone extends Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.getShape = this.getShape.bind(this);

    this.state = {
      sound: null
    };
  }

  play(e) {
    if (e.buttons || this.props.isEager) {
      var sound = this.props.play(this.props.nota);

      this.setState({
        sound: sound
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
    const startAngle = 15;
    const transform = {
      2: `rotate(${startAngle + (index * -factor) / 10 + modifier})`,
      3: `rotate(${startAngle + (index * factor) / 3 - modifier})`,
      4: `rotate(${startAngle + index + factor * 2 + modifier})`,
      5: `rotate(${startAngle + Math.pow(index, factor / 4 + modifier)})`,
      6: `rotate(${startAngle + Math.sin((index * factor) / 24 - modifier)})`,
      7: `rotate(${startAngle + Math.tan(index * factor * 2 + modifier)}) scale(${
        (index * modifier) / 20
      })`,
      8: `rotate(${startAngle + 12 - (index * factor) / 2}) scale(${(index * factor) / 27})`
    };

    return (
      <path
        className={this.props.class + (isPressed ? " active" : " inactive")}
        d={this.props.path}
        onMouseDown={this.play}
        onMouseOver={this.play}
        onMouseOut={this.handleMouseOut}
        onMouseUp={this.handleMouseUp}
        transform={transform[shape] || ""}
      >
        <bx-title>{this.props.tone}</bx-title>
      </path>
    );
  }
}

export default Tone;

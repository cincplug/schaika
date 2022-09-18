import React, { Component } from "react";
import Tone from "./Tone";

class Octave extends Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
  }

  play(nota) {
    return this.props.play(nota);
  }
  
  stop(sound, nota) {
    this.props.stop(sound, nota);
  }

  render() {
    var octave = [];
    for (var semiTone = 0; semiTone < this.props.until; semiTone++) {
      let p = this.props.keys[semiTone][1].split(" ");
      var path = "M " + p[0] + " " + p[1] + " ";
      for (var i = 2; i < p.length; i += 2) {
        path += "L " + p[i] + " " + p[i + 1] + " ";
      }
      path += " Z";
      const nota = this.props.which * this.props.keysPerOctave + semiTone;
      var jelblack = [1, 3, 6, 8, 10].indexOf(semiTone) !== -1 ? "black" : "white";
      var className = "tone " + jelblack + " nije";

      var tone = (
        <Tone
          key={"d-" + this.props.which + "rer" + semiTone}
          class={className}
          path={path}
          nota={nota}
          play={this.play}
          stop={this.stop}
          tone={this.props.keys[this.props.which][0]}
          index={semiTone}
          shape={this.props.shape}
          factor={this.props.factor}
          modifier={this.props.modifier}
          isEager={this.props.isEager}
          isPressed={(this.props.oscillators.find((osc) => osc.note === nota))}
        />
      );
      octave.push(tone);
    }
    return (
      <g className="octave" transform={this.props.transform}>
        {octave}
      </g>
    );
  }
}

export default Octave;

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

  stop(sound) {
    this.props.stop(sound);
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
      var nota = this.props.which * this.props.keysPerOctave + semiTone;
      var jelCrna = [1, 3, 6, 8, 10].indexOf(semiTone) !== -1 ? "crna" : "bela";
      var className = "tone " + jelCrna + " nije";

      var tone = (
        <Tone
          key={"d-" + semiTone}
          class={className}
          path={path}
          nota={nota}
          play={this.play}
          stop={this.stop}
          tone={this.props.keys[this.props.which][0]}
          index={semiTone}
          shape={this.props.shape}
          factor={this.props.factor}
          tractor={this.props.tractor}
        />
      );
      octave.push(tone);
      nota++;
    }
    return (
      <g className="octave" transform={this.props.transform}>
        {octave}
      </g>
    );
  }
}

export default Octave;

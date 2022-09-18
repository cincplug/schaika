import React, { Component } from "react";
import keys from "../data/keys.json";
import tones from "../data/tones.json";
import frequencies from "../data/frequencies.json";
import keyboardMap from "../data/keyboard-map.json";
import Header from "./Header";
import Octave from "./Octave";
import Controls from "./Controls";
import Notation from "./Notation";
import Clip from "./Clip";

import "./main.css";

const context = new AudioContext();
const octaveWidth = 330;
const keyboardHeight = window.innerHeight / 2.5;
const keysPerOctave = 12;
const whiteKeysPerOctave = 7;
const keysAfter = 5;
const whiteKeysAfter = 3;
const waveForms = ["sine", "triangle", "sawtooth", "square"];
const notesPerOctave = 12;

class Keyboard extends Component {
  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
    this.updateNotation = this.updateNotation.bind(this);
    this.record = this.record.bind(this);
    this.playNote = this.playNote.bind(this);
    this.playClip = this.playClip.bind(this);
    this.remove = this.remove.bind(this);
    this.repeat = this.repeat.bind(this);
    this.getKeyboardNote = this.getKeyboardNote.bind(this);

    const octavesCount = 5;
    window.oscillators = [];
    this.a = [];

    this.state = {
      started: "",
      isRecording: false,
      octavesCount: octavesCount,
      initial: 2,
      colour: 1,
      waveForm: 0,
      isEager: 0,
      attack: 1,
      release: 2,
      tremolo: 0,
      volume: 4,
      shape: 1,
      factor: 10,
      modifier: 4,
      frequency: null,
      clips: [],
      notation: "en",
      tonesCount: this.countKeys(octavesCount),
    };
  }

  componentDidMount() {
    document.addEventListener("keyup", this.handleKeyUp, false);
    document.addEventListener("keydown", this.handleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyUp, false);
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }

  handleKeyUp(e) {
    if (e.keyCode === 32) {
      this.record();
    }
    const note = this.getKeyboardNote(e.code);
    if (note >= 0) {
      this.stopOscillators(note + notesPerOctave);
    }
  }

  handleKeyDown(e) {
    if (e.code === "Tab") {
      e.preventDefault();
    }
    const note = this.getKeyboardNote(e.code);
    if (note !== null && note >= 0) {
      const isAlreadyPlaying = window.oscillators.find(
        (k) => k.note === note + notesPerOctave
      );
      if (!isAlreadyPlaying || this.state.tremolo) {
        this.play(note + notesPerOctave);
      }
    }
  }

  getKeyboardNote(key) {
    const note = keyboardMap.indexOf(key);
    if (note >= 0) {
      return note;
    }
    return null;
  }

  countKeys(octavesCount) {
    return keysPerOctave * octavesCount + keysAfter;
  }

  updateNotation(notation) {
    this.setState({
      notation: notation,
    });
  }

  updateProperty(property, action, explicitValue) {
    var value;
    switch (action) {
      case "increase":
        value = this.state[property] + 1;
        break;
      case "decrease":
        value = this.state[property] - 1;
        break;
      case "zero":
        value = 0;
        if (property === "volume" && this.state.volume === 0) {
          value = 1;
        }
        break;
      default:
        break;
    }
    this.setState(
      {
        [property]: explicitValue || value,
      },
      function () {
        if (this.state.initial + this.state.octavesCount > 9) {
          if (property === "initial") {
            this.setState({
              octavesCount: this.state.octavesCount - 1,
            });
          }
          if (property === "octavesCount") {
            this.setState({
              initial: this.state.initial - 1,
            });
          }
        }
      }
    );
    if (property === "octavesCount") {
      this.setState({
        tonesCount: this.countKeys(value),
      });
    }
    if (property === "shape" && action === "increase") {
      this.updateProperty("isEager", null, 1);
    }
  }

  playNote(nota, since = 0, until = 0) {
    since /= 1000;
    until /= 1000;
    var sound = [];
    for (var i = 0; i < this.state.colour; i++) {
      let frequency =
        frequencies[nota + (i + this.state.initial) * keysPerOctave];
      if (!this.state.started) {
        this.setState({
          started: " jeste",
        });
      }

      var ton = context.createOscillator();
      ton.type = waveForms[this.state.waveForm];
      ton.frequency.value = frequency;
      var gain = context.createGain();
      ton.connect(gain);
      gain.connect(context.destination);

      var now = context.currentTime;
      let decrease = Math.pow(this.state.waveForm + 1, 2);

      var volume = this.state.volume / decrease / 4;
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(
        volume,
        now + since + this.state.attack / 10
      );
      gain.gain.exponentialRampToValueAtTime(
        volume / 10,
        now + since + this.state.attack / 10 + this.state.release / 5
      );
      ton.start(now + since);
      if (until) {
        ton.stop(now + until);
      }

      this.setState({
        frequency: frequency,
        nota: tones[this.state.notation][nota % 12],
        octave: Math.floor(
          (nota + this.state.initial * keysPerOctave) / keysPerOctave
        ),
      });

      sound.push(ton);
    }

    return sound;
  }

  play(nota) {
    var sound = this.playNote(nota);

    if (this.state.isRecording) {
      var kad;
      if (this.clip.tones.length === 0) {
        this.since = context.currentTime;
        kad = 0;
      } else {
        kad = context.currentTime - this.since;
      }
      this.clip.tones.push([nota, kad * 1000, 0]);
    }

    window.oscillators.push({ note: nota, sound });
    return sound;
  }

  stop(sound, nota) {
    for (var ton in sound) {
      sound[ton].stop(context.currentTime);
      delete sound[ton];
      this.stopOscillators(nota);
    }

    if (this.state.isRecording && this.clip && this.clip.tones.length > 0) {
      var kad = context.currentTime - this.since;
      this.clip.tones[this.clip.tones.length - 1][2] = kad * 1000;
    }
  }

  stopOscillators(note) {
    window.oscillators.forEach((oscillator, index) => {
      if (oscillator.note === note) {
        window.oscillators = window.oscillators.filter(
          (osc) => osc.note !== note
        );
        this.stop(oscillator.sound);
      }
    });
  }

  record() {
    if (this.state.isRecording) {
      if (this.clip) {
        if (this.clip.tones.length > 0) {
          this.clip.duration = context.currentTime - this.since;
          this.setState((prevState) => {
            return {
              clips: prevState.clips.concat(this.clip),
            };
          });
        }
      }
      this.setState({
        isRecording: false,
      });
    } else {
      this.since = context.currentTime;
      this.setState({
        isRecording: true,
      });
      this.clip = {
        duration: 0,
        isPlaying: false,
        isRepeat: false,
        tones: [],
        zvuci: {},
      };
    }
  }

  playClip(clip, index) {
    var t = this;
    var p = this.state.clips;
    var kolikoTraje = clip.duration;
    clip.isPlaying = true;
    setTimeout(function () {
      clip.isPlaying = false;
      p[index].isPlaying = false;
      t.setState({
        clips: p,
      });
      if (t.state.clips[index].isRepeat) {
        t.playClip(clip, index);
      }
    }, kolikoTraje * 1000);
    for (var n = 0; n < clip.tones.length; n++) {
      t.playNote(clip.tones[n][0], clip.tones[n][1], clip.tones[n][2]);
    }
  }

  remove(clip) {
    let p = this.state.clips;
    p.splice(clip, 1);
    this.setState({
      clips: p,
    });
  }

  repeat(clip) {
    let p = this.state.clips;
    p[clip].isRepeat = !p[clip].isRepeat;
    this.setState({
      clips: p,
    });
  }

  render() {
    let octavesCount = this.state.octavesCount;
    let keyWidth = octaveWidth / whiteKeysPerOctave;
    let keyboardWidth =
      (octavesCount * whiteKeysPerOctave + whiteKeysAfter) * keyWidth;
    let viewBox = "0 0 " + keyboardWidth + " " + keyboardHeight;
    if (keysAfter > 0) {
      octavesCount++;
    }
    var klavijatura = [];
    for (var o = 0; o < octavesCount; o++) {
      let transform = "translate(" + octaveWidth * o + " 0)";
      var until = o < octavesCount - 1 ? keysPerOctave : keysAfter;

      klavijatura.push(
        <Octave
          key={"o-" + o}
          which={o}
          transform={transform}
          until={until}
          keys={keys}
          play={this.play}
          stop={this.stop}
          keysPerOctave={keysPerOctave}
          shape={this.state.shape}
          factor={this.state.factor}
          modifier={this.state.modifier}
          isEager={this.state.isEager}
          oscillators={window.oscillators}
        />
      );
    }

    var notacije = [];
    for (var i in tones) {
      notacije.push(
        <Notation
          key={"not" + i}
          notation={i}
          isMatching={i === this.state.notation}
          updateNotation={this.updateNotation}
        />
      );
    }

    var clips = [];
    for (var p = 0; p < this.state.clips.length; p++) {
      clips.push(
        <Clip
          key={"clip-" + p}
          index={p}
          clip={this.state.clips[p]}
          tonesCount={this.state.tonesCount}
          isPlaying={this.state.clips[p].isPlaying}
          isRepeat={this.state.clips[p].isRepeat}
          playClip={this.playClip}
          remove={this.remove}
          repeat={this.repeat}
        />
      );
    }

    return (
      <div id="keyboard">
        <Header />
        <div id="kutija">
          <Controls
            octavesCount={this.state.octavesCount}
            colour={this.state.colour}
            waveForms={waveForms}
            waveForm={this.state.waveForm}
            isEager={this.state.isEager}
            initial={this.state.initial}
            attack={this.state.attack}
            release={this.state.release}
            tremolo={this.state.tremolo}
            volume={this.state.volume}
            shape={this.state.shape}
            factor={this.state.factor}
            modifier={this.state.modifier}
            updateProperty={this.updateProperty}
            record={this.record}
            isRecording={this.state.isRecording}
          />

          <svg
            id="klavijatura"
            className="play"
            width={keyboardWidth}
            viewBox={viewBox}
            version="1.1"
          >
            <g>{klavijatura}</g>
          </svg>
          <div className={"output" + this.state.started}>
            <div className="item">
              <span className="label">Base tones: </span>
              <span>{this.state.nota}</span>
              <div className="notacije">
                <span className="label">Notation:</span> {notacije}
              </div>
            </div>
            <div className="item">
              <span className="label">Base octave: </span>
              <span>{this.state.octave}</span>
            </div>
            <div className="item">
              <span className="label">Base frequency: </span>
              <span>{this.state.frequency} Hz</span>
            </div>
          </div>
        </div>
        <div className="clips">{clips}</div>
      </div>
    );
  }
}

export default Keyboard;

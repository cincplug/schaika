import React, { Component } from "react";
import Property from "./Property";

class Controls extends Component {
  updateProperty(property, action) {
    this.props.updateProperty(property, action);
  }

  record() {
    this.props.record();
  }

  render() {
    return (
      <div id="tabla">
        <Property
          property="initial"
          value={this.props.initial}
          limit={{
            lower: 0,
            upper: 3,
          }}
          trans={{
            en: "Start octave",
          }}
          updateProperty={(property, action) =>
            this.updateProperty(property, action)
          }
        />

        <Property
          property="octavesCount"
          value={this.props.octavesCount}
          limit={{
            lower: 1,
            upper: 7,
          }}
          trans={{
            en: "Octaves",
          }}
          updateProperty={(property, action) =>
            this.updateProperty(property, action)
          }
        />

        <Property
          property="colour"
          value={this.props.colour}
          limit={{
            lower: 1,
            upper: 4,
          }}
          trans={{
            en: "Oscillators",
          }}
          updateProperty={(property, action) =>
            this.updateProperty(property, action)
          }
        />

        <Property
          property="waveForm"
          value={this.props.waveForm}
          limit={{
            lower: 0,
            upper: 3,
          }}
          trans={{
            en: "Waveform",
          }}
          tekst={this.props.waveForms}
          updateProperty={(property, action) =>
            this.updateProperty(property, action)
          }
        />

        <Property
          property="attack"
          value={this.props.attack}
          limit={{
            lower: 0,
            upper: 12,
          }}
          trans={{
            en: "Attack",
          }}
          updateProperty={(property, action) =>
            this.updateProperty(property, action)
          }
        />

        <Property
          property="release"
          value={this.props.release}
          limit={{
            lower: 0,
            upper: 25,
          }}
          trans={{
            en: "Release",
          }}
          updateProperty={(property, action) =>
            this.updateProperty(property, action)
          }
        />

        <Property
          property="volume"
          value={this.props.volume}
          limit={{
            lower: 1,
            upper: 10,
          }}
          trans={{
            en: "Volume",
          }}
          updateProperty={(property, action) =>
            this.updateProperty(property, action)
          }
        />

        {/* <div className={ "header mir j-" + this.props.volume }
                    onClick={ () => this.updateProperty('volume', 'zero') }>
                </div> */}

        <div
          className={"rekord isRecording-" + this.props.isRecording.toString()}
          onClick={() => this.record()}
        >
          <div className="circle"></div>
          <div className="square"></div>
        </div>
      </div>
    );
  }
}

export default Controls;

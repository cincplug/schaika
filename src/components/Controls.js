import React, { Component } from 'react';
import Property from './Property';

class Controls extends Component {
    constructor(props) {
        super(props);
        this.updateProperty = this.updateProperty.bind(this);
        this.record = this.record.bind(this);
    }
    
    updateProperty(property, action){
        this.props.updateProperty(property, action);
    }

    record(){
        this.props.record();
    }
    
    render() {        
        
        return (
            <div id="tabla">

                <Property 
                    property="initial"
                    value={ this.props.initial }
                    limit={{
                        lower: 0,
                        upper: 3
                    }}
                    trans={{
                        en: "Start octave"
                    }}
                    updateProperty={ this.updateProperty }
                />

                <Property 
                    property="octavesCount"
                    value={ this.props.octavesCount }
                    limit={{
                        lower: 1,
                        upper: 7
                    }}
                    trans={{
                        en: "Octaves"
                    }}
                    updateProperty={ this.updateProperty }
                />

                <Property 
                    property="colour"
                    value={ this.props.colour }
                    limit={{
                        lower: 1,
                        upper: 4
                    }}
                    trans={{
                        en: "Oscillators"
                    }}
                    updateProperty={ this.updateProperty }
                />

                <Property 
                    property="waveForm"
                    value={ this.props.waveForm }
                    limit={{
                        lower: 0,
                        upper: 3
                    }}
                    trans={{
                        en: "Waveform"
                    }}
                    tekst={ this.props.waveForms }
                    updateProperty={ this.updateProperty }
                />

                <Property 
                    property="attack"
                    value={ this.props.attack }
                    limit={{
                        lower: 0,
                        upper: 12
                    }}
                    trans={{
                        en: "Attack"
                    }}
                    updateProperty={ this.updateProperty }
                />

                <Property 
                    property="release"
                    value={ this.props.release }
                    limit={{
                        lower: 0,
                        upper: 25
                    }}
                    trans={{
                        en: "Release"
                    }}
                    updateProperty={ this.updateProperty }
                />

                {/* <Property 
                    property="sustain"
                    value={ this.props.sustain }
                    limit={{
                        lower: 0,
                        upper: 40
                    }}
                    trans={{
                        en: "Sustain"
                    }}
                    updateProperty={ this.updateProperty }
                /> */}

                <Property 
                    property="volume"
                    value={ this.props.volume }
                    limit={{
                        lower: 1,
                        upper: 10
                    }}
                    trans={{
                        en: "Volume"
                    }}
                    updateProperty={ this.updateProperty }
                />

                {/* <div className={ "header mir j-" + this.props.volume }
                    onClick={ () => this.updateProperty('volume', 'zero') }>
                </div> */}

                <div className={ "header rekord isRecording-" + this.props.isRecording.toString() }
                    onClick={ this.record }>
                    <div className="circle"></div>
                    <div className="square"></div>
                </div>


            </div>
        );
    }
}

export default Controls;

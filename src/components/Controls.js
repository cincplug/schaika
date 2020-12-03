import React, { Component } from 'react';
import Property from './Property';

class Controls extends Component {
    constructor(props) {
        super(props);
        this.promeniProperty = this.promeniProperty.bind(this);
        this.snimaj = this.snimaj.bind(this);
    }
    
    promeniProperty(svojstvo, akcija){
        this.props.promeniProperty(svojstvo, akcija);
    }

    snimaj(){
        this.props.snimaj();
    }
    
    render() {        
        
        return (
            <div id="tabla">

                <Property 
                    svojstvo="početna"
                    vrednost={ this.props.početna }
                    limit={{
                        donji: 0,
                        gornji: 3
                    }}
                    trans={{
                        en: "Start octave"
                    }}
                    promeniProperty={ this.promeniProperty }
                />

                <Property 
                    svojstvo="brojOctave"
                    vrednost={ this.props.brojOctave }
                    limit={{
                        donji: 1,
                        gornji: 7
                    }}
                    trans={{
                        en: "Octaves"
                    }}
                    promeniProperty={ this.promeniProperty }
                />

                <Property 
                    svojstvo="boja"
                    vrednost={ this.props.boja }
                    limit={{
                        donji: 1,
                        gornji: 4
                    }}
                    trans={{
                        en: "Oscillators"
                    }}
                    promeniProperty={ this.promeniProperty }
                />

                <Property 
                    svojstvo="oblik"
                    vrednost={ this.props.oblik }
                    limit={{
                        donji: 0,
                        gornji: 3
                    }}
                    trans={{
                        en: "Waveform"
                    }}
                    tekst={ this.props.oblici }
                    promeniProperty={ this.promeniProperty }
                />

                <Property 
                    svojstvo="atak"
                    vrednost={ this.props.atak }
                    limit={{
                        donji: 0,
                        gornji: 12
                    }}
                    trans={{
                        en: "Attack"
                    }}
                    promeniProperty={ this.promeniProperty }
                />

                <Property 
                    svojstvo="rilis"
                    vrednost={ this.props.rilis }
                    limit={{
                        donji: 0,
                        gornji: 25
                    }}
                    trans={{
                        en: "Release"
                    }}
                    promeniProperty={ this.promeniProperty }
                />

                {/* <Property 
                    svojstvo="sustejn"
                    vrednost={ this.props.sustejn }
                    limit={{
                        donji: 0,
                        gornji: 40
                    }}
                    trans={{
                        en: "Sustain"
                    }}
                    promeniProperty={ this.promeniProperty }
                /> */}

                <Property 
                    svojstvo="jačina"
                    vrednost={ this.props.jačina }
                    limit={{
                        donji: 1,
                        gornji: 10
                    }}
                    trans={{
                        en: "Volume"
                    }}
                    promeniProperty={ this.promeniProperty }
                />

                {/* <div className={ "zaglavlje mir j-" + this.props.jačina }
                    onClick={ () => this.promeniProperty('jačina', 'nula') }>
                </div> */}

                <div className={ "zaglavlje rekord snima-" + this.props.snima.toString() }
                    onClick={ this.snimaj }>
                    <div className="krug"></div>
                    <div className="kvadrat"></div>
                </div>


            </div>
        );
    }
}

export default Controls;

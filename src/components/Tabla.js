import React, { Component } from 'react';
import Svojstvo from '../components/Svojstvo';

class Tabla extends Component {
    constructor(props) {
        super(props);
        this.promeniSvojstvo = this.promeniSvojstvo.bind(this);
        this.snimaj = this.snimaj.bind(this);
    }
    
    promeniSvojstvo(svojstvo, akcija){
        this.props.promeniSvojstvo(svojstvo, akcija);
    }

    snimaj(){
        this.props.snimaj();
    }
    
    render() {        
        
        return (
            <div id="tabla">

                <Svojstvo 
                    svojstvo="početna"
                    vrednost={ this.props.početna }
                    limit={{
                        donji: 0,
                        gornji: 3
                    }}
                    trans={{
                        en: "Start octave"
                    }}
                    promeniSvojstvo={ this.promeniSvojstvo }
                />

                <Svojstvo 
                    svojstvo="brojOktava"
                    vrednost={ this.props.brojOktava }
                    limit={{
                        donji: 1,
                        gornji: 7
                    }}
                    trans={{
                        en: "Octaves"
                    }}
                    promeniSvojstvo={ this.promeniSvojstvo }
                />

                <Svojstvo 
                    svojstvo="boja"
                    vrednost={ this.props.boja }
                    limit={{
                        donji: 1,
                        gornji: 4
                    }}
                    trans={{
                        en: "Oscillators"
                    }}
                    promeniSvojstvo={ this.promeniSvojstvo }
                />

                <Svojstvo 
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
                    promeniSvojstvo={ this.promeniSvojstvo }
                />

                <Svojstvo 
                    svojstvo="atak"
                    vrednost={ this.props.atak }
                    limit={{
                        donji: 0,
                        gornji: 12
                    }}
                    trans={{
                        en: "Attack"
                    }}
                    promeniSvojstvo={ this.promeniSvojstvo }
                />

                <Svojstvo 
                    svojstvo="rilis"
                    vrednost={ this.props.rilis }
                    limit={{
                        donji: 0,
                        gornji: 25
                    }}
                    trans={{
                        en: "Release"
                    }}
                    promeniSvojstvo={ this.promeniSvojstvo }
                />

                <Svojstvo 
                    svojstvo="sustejn"
                    vrednost={ this.props.sustejn }
                    limit={{
                        donji: 0,
                        gornji: 40
                    }}
                    trans={{
                        en: "Sustain"
                    }}
                    promeniSvojstvo={ this.promeniSvojstvo }
                />

                <Svojstvo 
                    svojstvo="jačina"
                    vrednost={ this.props.jačina }
                    limit={{
                        donji: 0,
                        gornji: 10
                    }}
                    trans={{
                        en: "Volume"
                    }}
                    promeniSvojstvo={ this.promeniSvojstvo }
                />

                <div className={ "zaglavlje mir j-" + this.props.jačina }
                    onClick={ () => this.promeniSvojstvo('jačina', 'nula') }>
                </div>

                <div className={ "zaglavlje rekord snima-" + this.props.snima.toString() }
                    onClick={ this.snimaj }>
                    <div className="krug"></div>
                    <div className="kvadrat"></div>
                </div>


            </div>
        );
    }
}

export default Tabla;

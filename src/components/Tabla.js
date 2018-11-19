import React, { Component } from 'react';
import Svojstvo from '../components/Svojstvo';

class Tabla extends Component {
    constructor(props) {
        super(props);
        this.promeniSvojstvo = this.promeniSvojstvo.bind(this);
    }
    
    promeniSvojstvo(svojstvo, akcija){
        this.props.promeniSvojstvo(svojstvo, akcija);
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
                    svojstvo="kontinuitet"
                    vrednost={ this.props.kontinuitet }
                    limit={{
                        donji: 1,
                        gornji: 12
                    }}
                    trans={{
                        en: "Continuity"
                    }}
                    promeniSvojstvo={ this.promeniSvojstvo }
                />
                
            </div>
        );
    }
}

export default Tabla;

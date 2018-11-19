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
                    svojstvo="brojOktava"
                    vrednost={ this.props.brojOktava }
                    limit={{
                        donji: 1,
                        gornji: 7
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
                    promeniSvojstvo={ this.promeniSvojstvo }
                />
                
            </div>
        );
    }
}

export default Tabla;

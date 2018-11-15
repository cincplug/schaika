import React, { Component } from 'react';
import Strelica from '../components/Strelica';

class Tabla extends Component {
    constructor(props) {
        super(props);
        this.promeniBrojOktava = this.promeniBrojOktava.bind(this);
    }
    
    promeniBrojOktava(akcija){
        if(
            this.props.brojOktava > this.props.limit.donji &&
            this.props.brojOktava < this.props.limit.gornji
        ) {
            this.props.promeniBrojOktava(akcija);
        }
    }
    
    render() {        
        
        return (
            <div id="tabla">

                <div className="broj-oktava">

                    <Strelica 
                        akcija="smanji"
                        promeniBrojOktava={ this.promeniBrojOktava }
                    />

                    <span className="cifra">
                        { this.props.brojOktava }
                    </span>

                    <Strelica 
                        akcija="povecaj"
                        promeniBrojOktava={ this.promeniBrojOktava }
                    />

                </div>
            </div>
        );
    }
}

export default Tabla;

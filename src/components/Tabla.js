import React, { Component } from 'react';
import Strelica from '../components/Strelica';

class Tabla extends Component {
    constructor(props) {
        super(props);
        this.promeniBrojOktava = this.promeniBrojOktava.bind(this);
    }
    
    promeniBrojOktava(akcija){
        this.props.promeniBrojOktava(akcija);
    }
    
    render() {        
        
        return (
            <div id="tabla">

                <div className="broj-oktava">

                    <Strelica 
                        akcija="smanji"
                        brojOktava={ this.props.brojOktava }
                        limit={ this.props.limit.donji }
                        promeniBrojOktava={ this.promeniBrojOktava }
                    />

                    <span className="cifra">
                        { this.props.brojOktava }
                    </span>

                    <Strelica 
                        akcija="povecaj"
                        brojOktava={ this.props.brojOktava }
                        limit={ this.props.limit.gornji }
                        promeniBrojOktava={ this.promeniBrojOktava }
                    />

                </div>
            </div>
        );
    }
}

export default Tabla;

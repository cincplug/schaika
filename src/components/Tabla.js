import React, { Component } from 'react';
import Strelica from '../components/Strelica';

class Tabla extends Component {
    constructor(props) {
        super(props);
        this.promeniSvojstvo = this.promeniSvojstvo.bind(this);
    }
    
    promeniSvojstvo(akcija){
        this.props.promeniSvojstvo(akcija);
    }
    
    render() {        
        
        return (
            <div id="tabla">

                <div className="broj-oktava">

                    <Strelica 
                        akcija="smanji"
                        brojOktava={ this.props.brojOktava }
                        limit={ this.props.limit.donji }
                        promeniSvojstvo={ this.promeniSvojstvo }
                    />

                    <span className="cifra">
                        { this.props.brojOktava }
                    </span>

                    <Strelica 
                        akcija="povecaj"
                        brojOktava={ this.props.brojOktava }
                        limit={ this.props.limit.gornji }
                        promeniSvojstvo={ this.promeniSvojstvo }
                    />

                </div>
            </div>
        );
    }
}

export default Tabla;

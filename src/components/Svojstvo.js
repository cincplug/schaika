import React, { Component } from 'react';
import Strelica from '../components/Strelica';

class Svojstvo extends Component {
    constructor(props) {
        super(props);
        this.promeniSvojstvo = this.promeniSvojstvo.bind(this);
    }
    
    promeniSvojstvo(svojstvo, akcija){
        this.props.promeniSvojstvo(svojstvo, akcija);
    }
    
    render() {        
        var klasa = "svojstvo " + this.props.svojstvo + 
            (this.props.tekst ? ' tekst' : '');
        var vrednost = this.props.vrednost;
        if(this.props.tekst){
            vrednost = this.props.tekst[this.props.vrednost];
        }
        return (
            <div className={ klasa }>

                <div className="ime-svojstva label">{ this.props.trans.en }</div>
                <Strelica 
                    svojstvo={ this.props.svojstvo }
                    akcija="smanji"
                    vrednost={ this.props.vrednost }
                    limit={ this.props.limit.donji }
                    promeniSvojstvo={ this.promeniSvojstvo }
                />

                <span className="cifra">
                    { vrednost }
                </span>

                <Strelica 
                    svojstvo={ this.props.svojstvo }
                    akcija="povecaj"
                    vrednost={ this.props.vrednost }
                    limit={ this.props.limit.gornji }
                    promeniSvojstvo={ this.promeniSvojstvo }
                />

            </div>
                
        );
    }
}

export default Svojstvo;

import React, { Component } from 'react';
import Arrow from './Arrow';

class Property extends Component {
    constructor(props) {
        super(props);
        this.promeniProperty = this.promeniProperty.bind(this);
    }
    
    promeniProperty(svojstvo, akcija){
        this.props.promeniProperty(svojstvo, akcija);
    }
    
    render() {        
        var klasa = "svojstvo " + this.props.svojstvo + 
            (this.props.tekst ? ' tekst' : '');
        var vrednost = this.props.vrednost;
        if(this.props.tekst){
            vrednost = this.props.tekst[this.props.vrednost].substr(0,3);
        }
        return (
            <div className={ klasa }>

                <div className="ime-svojstva label">{ this.props.trans.en }</div>
                <Arrow 
                    svojstvo={ this.props.svojstvo }
                    akcija="smanji"
                    vrednost={ this.props.vrednost }
                    limit={ this.props.limit.donji }
                    promeniProperty={ this.promeniProperty }
                />

                <span className="cifra">
                    { vrednost }
                </span>

                <Arrow 
                    svojstvo={ this.props.svojstvo }
                    akcija="povecaj"
                    vrednost={ this.props.vrednost }
                    limit={ this.props.limit.gornji }
                    promeniProperty={ this.promeniProperty }
                />

            </div>
                
        );
    }
}

export default Property;

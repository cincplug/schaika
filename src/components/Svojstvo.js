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
        
        return (
            
            <div className={ "svojstvo " + this.props.svojstvo }>

                <Strelica 
                    svojstvo={ this.props.svojstvo }
                    akcija="smanji"
                    vrednost={ this.props.vrednost }
                    limit={ this.props.limit.donji }
                    promeniSvojstvo={ this.promeniSvojstvo }
                />

                <span className="cifra">
                    { this.props.vrednost }
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

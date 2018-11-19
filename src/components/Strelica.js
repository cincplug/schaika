import React, { Component } from 'react';

class Strelica extends Component {
    constructor(props){
        super(props);
        this.promeniSvojstvo = this.promeniSvojstvo.bind(this);
    }
    
    promeniSvojstvo(){
        if( 
            (this.props.akcija === 'povecaj' && this.props.vrednost < this.props.limit)
            ||
            (this.props.akcija === 'smanji' && this.props.vrednost > this.props.limit)
        ) {
            this.props.promeniSvojstvo(this.props.svojstvo, this.props.akcija);
        }
    }
    
    render() {
        return (
            <span className={ "strelica " + this.props.akcija }
                onClick={ this.promeniSvojstvo }>
                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    version="1.1"
                >
                    <g>
                        <path d="M 0 0 L 30 15 L 0 30 Z"></path>
                    </g>
                </svg>
            </span>
        );
    }
}

export default Strelica;

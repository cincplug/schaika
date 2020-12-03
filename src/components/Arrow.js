import React, { Component } from 'react';

class Arrow extends Component {
    constructor(props){
        super(props);
        this.promeniProperty = this.promeniProperty.bind(this);
    }
    
    promeniProperty(){
        if( 
            (this.props.akcija === 'povecaj' && this.props.vrednost < this.props.limit)
            ||
            (this.props.akcija === 'smanji' && this.props.vrednost > this.props.limit)
        ) {
            this.props.promeniProperty(this.props.svojstvo, this.props.akcija);
        }
    }
    
    render() {
        return (
            <span className={ "strelica " + this.props.akcija }
                onClick={ this.promeniProperty }>
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

export default Arrow;

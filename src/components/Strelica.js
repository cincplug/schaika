import React, { Component } from 'react';

class Strelica extends Component {
    constructor(props){
        super(props);
        this.promeniBrojOktava = this.promeniBrojOktava.bind(this);
    }
    
    promeniBrojOktava(koliko){
        this.props.promeniBrojOktava(this.props.akcija);
    }
    
    render() {        
        return (
            <span className={ "strelica " + this.props.akcija }
                onClick={ this.promeniBrojOktava }>
                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    version="1.1"
                >
                    <g>
                        <path fill="white" d="M 0 0 L 30 15 L 0 30 Z"></path>
                    </g>
                </svg>
            </span>
        );
    }
}

export default Strelica;

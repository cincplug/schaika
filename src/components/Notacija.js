import React, { Component } from 'react';

class Notacija extends Component {
    constructor(props) {
        super(props);
        this.promeniNotaciju = this.promeniNotaciju.bind(this);
    }
    
    promeniNotaciju(){
        this.props.promeniNotaciju(this.props.notacija);
    }
    
    render() {
        var klasa = "label notacija notacija-" + this.props.jelOva.toString();        
        return (
            <span className={ klasa }
                onClick={ this.promeniNotaciju }>
                { this.props.notacija }
            </span>
        );
    }
}

export default Notacija;

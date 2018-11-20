import React, { Component } from 'react';

class Pesma extends Component {
    constructor(props) {
        super(props);
        this.odsvirajPesmu = this.odsvirajPesmu.bind(this);
    }
    
    odsvirajPesmu(){
        this.props.odsvirajPesmu(this.props.pesma);
    }
    
    render() {
        var klasa = "pesma pesma-" + this.props.kojaPoRedu.toString();        
        return (
            <span className={ klasa }
                onClick={ this.odsvirajPesmu }>
                { JSON.stringify(this.props.pesma) }
            </span>
        );
    }
}

export default Pesma;

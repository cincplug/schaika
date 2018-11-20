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
        var note = [];
        var pesma = this.props.pesma;
        for(var n in pesma){
            note.push(
                <rect
                    key={ "rec-" + n + '-' + this.props.kojaPoRedu }
                    x={ pesma[n][1] / 20 } 
                    y={ pesma[n][0] / 3 } 
                    width="5" 
                    height="5" 
                    fill="white"
                />
            );
        }
        var w = 0;
        if(pesma && pesma.length > 0) {
            w = pesma[pesma.length - 1][1] / 20 + 20;
        }
        var gde;
        if(this.props.sadSvira){
            gde = <rect x={ pesma[n][1] / 20 } y={ 0 } width="1" height="30" fill="black" />;
        }
        return (
            <svg 
                className={ klasa }
                onClick={ this.odsvirajPesmu }
                height="50"
                width={ w }
                viewBox={"0 0 " + w + " 50"}
            >
                <g>
                    { note }

                    { gde }
                </g>
            </svg>
        );
    }
}

export default Pesma;

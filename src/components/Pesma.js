import React, { Component } from 'react';

class Pesma extends Component {
    constructor(props) {
        super(props);
        this.odsvirajPesmu = this.odsvirajPesmu.bind(this);
        
        this.š = 20;
    }
    
    odsvirajPesmu(){
        this.props.odsvirajPesmu(this.props.pesma);
    }
    
    render() {
        var klasa = "pesma pesma-" + this.props.kojaPoRedu.toString();  
        var note = [];
        var pesma = this.props.pesma;
        for(var n in pesma.note){
            note.push(
                <rect
                    key={ "rec-" + n + '-' + this.props.kojaPoRedu }
                    x={ pesma.note[n][1] / this.š  } 
                    y={ pesma.note[n][0] } 
                    width="5" 
                    height="1" 
                />
            );
        }
        var širina = pesma.traje / 20;
        var gde;
        if(this.props.sadSvira){
            gde = <rect x={ pesma.note[n][1] / this.š  } y={ 0 } width="1" height="30" fill="black" />;
        }
        var visina = this.props.dirkiUkupno;
        return (
            <svg 
                className={ klasa }
                onClick={ this.odsvirajPesmu }
                height={ visina }
                width={ širina }
                viewBox={"0 0 " + širina + visina}
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

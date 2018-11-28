import React, { Component } from 'react';

const odnosŠirine = 10;
const odnosVisine = 1;

class Pesma extends Component {
    constructor(props) {
        super(props);
        this.odsvirajPesmu = this.odsvirajPesmu.bind(this);
        this.makni = this.makni.bind(this);
        this.vrti = this.vrti.bind(this);
    }
    
    odsvirajPesmu(){
        this.props.odsvirajPesmu(this.props.pesma, this.props.kojaPoRedu);
    }
    
    makni(){
        this.props.makni(this.props.kojaPoRedu);
    }
    
    vrti(){
        this.props.vrti(this.props.kojaPoRedu);
    }
    
    
    
    render() {
        var klasa = "pesma pesma-" + this.props.kojaPoRedu.toString() +
            " jelSvira-" + this.props.pesma.jelSvira.toString() +  
            " jelVrti-" + this.props.pesma.jelVrti.toString();  
        var note = [];
        var pesma = this.props.pesma;
        for(var n in pesma.note){
            note.push(
                <rect
                    className="notica"
                    key={ "rec-" + n + '-' + this.props.kojaPoRedu }
                    x={ Math.floor(pesma.note[n][1] / odnosŠirine) } 
                    y={ Math.floor((this.props.dirkiUkupno - pesma.note[n][0]) / odnosVisine) } 
                    width={ Math.floor((pesma.note[n][2] - pesma.note[n][1]) / odnosŠirine) } 
                    height="1" 
                />
            );
        }
        var širina = Math.floor(pesma.traje * 1000 / odnosŠirine);
        var visina = this.props.dirkiUkupno / odnosVisine;
        
        var gde;
        if(this.props.pesma.jelSvira){
            gde = <div 
                className="gde"
                style={{ animationDuration: pesma.traje * 1000 + 'ms' }}
            ></div>;
        }
        
        return (
            <div className={ klasa }>

                <div className="blok ime-pesme">
                    Pattern { this.props.kojaPoRedu + 1 }, { pesma.traje }, { visina }
                </div>

                <div className="blok note">
                    <svg 
                        height={ visina }
                        width={ širina }
                        viewBox={"0 0 " + širina + " " + visina}
                    >
                        <g>
                            { note }
                        </g>
                    </svg>
                </div>

                <div className="overlej">

                    <div 
                        className="sviraj"
                        onClick={ this.odsvirajPesmu }
                    ></div>

                    <div
                        className="vrti"
                        onClick={ this.vrti }
                    ></div>

                    <div
                        className="makni"
                        onClick={ this.makni }
                    ></div>

                </div>

                { gde }

            </div>
        );
    }
}

export default Pesma;
